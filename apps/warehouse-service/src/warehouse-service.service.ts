import {
  Exception,
  RedisService,
  captureException,
  parseInt,
} from '@libs/commons';
import { RedisKeys } from '@libs/commons/redis/const';
import { ErrorCode } from '@libs/const';
import { warehouse_proto } from '@libs/proto/controller/warehouse';
import { SupabaseService } from '@libs/supabase';
import { SupabaseErrorCode } from '@libs/supabase/const';
import { Injectable } from '@nestjs/common';
import { format } from 'util';

@Injectable()
export class WarehouseServiceService {
  async reserveStock(
    items: warehouse_proto.ReserveStockRequest.ItemReserve[],
  ): Promise<warehouse_proto.ReserveStockResponse.ItemReserved[]> {
    const fromDB = await this.supabase
      .from('warehouse_stock')
      .select('*')
      .in(
        'product_id',
        items.map((it) => it.productId),
      );
    if (fromDB.error) {
      throw new Exception(
        fromDB.error.message,
        parseInt(
          fromDB.error.code,
          ErrorCode.FailedGetWarehouseStockReserveStock,
        ),
      );
    }
    const reserve = Object.fromEntries(
      await Promise.all(
        fromDB.data.map(async (it) => {
          try {
            const stockFromRedis = await this.redisService.get(
              format(RedisKeys.WarehouseReserve, it.id.toString()),
            );
            return [it.id, parseInt(stockFromRedis, 0)];
          } catch (error) {
            captureException(error);
            return [it.id, 0];
          }
        }),
      ),
    );
    const mapRequest = Object.fromEntries(
      items.map(({ productId, quantity }) => [productId, quantity]),
    );

    //clone value
    const mapRequestFilled = { ...mapRequest };
    const groupByProductID: Record<number, []> = fromDB.data.reduce(
      (prev, it) => {
        prev[it.product_id] = prev[it.product_id] ?? [];
        prev[it.product_id].push(it);
        return prev;
      },
      {},
    );
    const resData: Array<
      warehouse_proto.ReserveStockResponse.ItemReserved & {
        id: number;
        qty: number;
      }
    > = [];
    for (const productWarehouse of Object.values(groupByProductID)) {
      const tempResData: typeof resData = [];
      for (const {
        quantity,
        id,
        price,
        warehouse_id,
        product_id,
      } of productWarehouse) {
        if (mapRequestFilled[id] === 0) {
          continue;
        }
        if (quantity == 0) {
          continue;
        }
        const finalQty = quantity - reserve[id];
        if (finalQty <= 0) {
          continue;
        }

        const diffQty = finalQty - mapRequestFilled[product_id];
        console.log({
          tempResData,
          id,
          mapRequestFilled,
          warehouse_id,
          finalQty,
          diffQty,
        });
        if (diffQty < 0) {
          mapRequestFilled[product_id] -= finalQty;
          tempResData.push({
            price,
            productId: product_id,
            warehouseId: warehouse_id,
            id,
            qty: finalQty,
          });
          continue;
        }
        if (diffQty >= 0) {
          resData.push(
            {
              price,
              productId: product_id,
              warehouseId: warehouse_id,
              id,
              qty: mapRequestFilled[product_id],
            },
            ...tempResData,
          );
          break;
        }
      }
    }
    resData.map(async (it) => {
      await this.redisService.incrby(
        format(RedisKeys.WarehouseReserve, it.id),
        it.qty,
      );
    });
    //TODO: need figureout prevent overlap stock when race condition
    return resData.map((it) => ({
      price: it.price,
      productId: it.productId,
      warehouseId: it.productId,
    }));
  }
  async getProductWarehouseInfo(
    input: warehouse_proto.GetProductWarehouseInfoRequest,
  ): Promise<warehouse_proto.GetProductWarehouseInfoResponse['data']> {
    try {
      let baseQuery = this.supabase
        .from('warehouse_stock')
        .select('*')
        .in('product_id', input.productIds);

      if (input.shopId) {
        baseQuery = baseQuery.eq('shop_id', input.shopId);
      }

      if (input.warehouseIds.length > 0) {
        baseQuery = baseQuery.in('warehouse_id', input.warehouseIds);
      }
      const { data, error } = await baseQuery;
      if (error) {
        if (error.code == SupabaseErrorCode.NoData) {
          return [];
        }
        throw error;
      }
      //check reserve stock
      const warehouseReserve = Object.fromEntries(
        await Promise.all(
          data.map(async (it) => {
            try {
              const key = format(RedisKeys.WarehouseReserve, it.id.toString());
              const res = await this.redisService.get(key);
              return [it.id, parseInt(res, 0)];
            } catch (error) {
              captureException(error);
              return [it.id, 0];
            }
          }),
        ),
      );

      const warehouseInfo = await this.supabase
        .from('warehouses')
        .select('id, status')
        .in(
          'id',
          data.map((it) => it.warehouse_id),
        );
      if (warehouseInfo.error) {
        if (error.code == SupabaseErrorCode.NoData) {
          return [];
        }
        throw error;
      }

      const warehouseMap = Object.fromEntries(
        warehouseInfo.data.map(({ id, status }) => [id, { status }]),
      );
      return data.map((it) => {
        const reserveQuantity = warehouseReserve[it.id] ?? 0;
        return {
          price: it.price,
          warehouseStatus: warehouseMap[it.warehouse_id].status,
          warehouseId: it.warehouse_id,
          productId: it.product_id,
          quantity:
            it.quantity < reserveQuantity ? 0 : it.quantity - reserveQuantity,
        };
      });
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  async addStockInformation(
    shopId: number,
    price: number,
    productId: number,
    quantity: number,
    warehouseId: number,
  ) {
    const { data, error } = await this.supabase.from('warehouse_stock').insert({
      shop_id: shopId,
      warehouse_id: warehouseId,
      product_id: productId,
      price: price,
      quantity: quantity,
    });
    if (error) {
      throw error;
    }
    return data;
  }
  async createWarehouse(shopId: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('warehouses')
      .insert({ name: `default WH ${shopId}`, shop_id: shopId })
      .select('*')
      .single();
    if (error) {
      throw error;
    }
    return data;
  }
  /**
   *
   */
  constructor(
    private readonly supabase: SupabaseService,
    private readonly redisService: RedisService,
  ) {}
  async getWarehouseInfo(shopId: number, warehouseId?: number) {
    if (shopId && warehouseId) {
      const { data, error } = await this.supabase.client
        .from('warehouses')
        .select('*')
        .match({ shop_id: shopId, id: warehouseId })
        .limit(1)
        .single();
      if (error) {
        if (error.code == SupabaseErrorCode.NoData) {
          //empty result
          throw new Exception(error.message, ErrorCode.NoWarehouseFound);
        }
        throw error;
      }
      return data;
    }

    if (!warehouseId) {
      const { data, error } = await this.supabase.client
        .from('warehouses')
        .select('*')
        .eq('shop_id', shopId)
        .limit(1)
        .single();
      if (error) {
        if (error.code == SupabaseErrorCode.NoData) {
          //expected can be empty result so return empty warehouse
          return {};
        }
        throw error;
      }
      return data;
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
