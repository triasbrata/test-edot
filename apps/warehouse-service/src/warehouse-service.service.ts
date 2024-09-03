import { Exception } from '@libs/commons';
import { ErrorCode } from '@libs/const';
import { SupabaseService } from '@libs/supabase';
import { SupabaseErrorCode } from '@libs/supabase/const';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseServiceService {
  async addStockInformation(
    shopId: number,
    price: number,
    productId: number,
    quantity: number,
    warehouseId: number,
  ) {
    const { data, error } = await this.supabase.client
      .from('warehouse_stock')
      .insert({
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
    const { data, error } = await this.supabase.client
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
        .match({ shop_id: shopId })
        .limit(1)
        .single();
      if (error) {
        console.log('whinfo 2', { error });
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
