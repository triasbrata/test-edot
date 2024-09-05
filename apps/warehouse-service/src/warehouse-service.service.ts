import { Exception } from '@libs/commons';
import { ErrorCode } from '@libs/const';
import { warehouse_proto } from '@libs/proto/controller/warehouse';
import { SupabaseService } from '@libs/supabase';
import { SupabaseErrorCode } from '@libs/supabase/const';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseServiceService {
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
      return data.map((it) => ({
        price: it.price,
        warehouseStatus: warehouseMap[it.warehouse_id].status,
        warehouseId: it.warehouse_id,
        productId: it.product_id,
        quantity: it.quantity,
      }));
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
  constructor(private readonly supabase: SupabaseService) {}
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
