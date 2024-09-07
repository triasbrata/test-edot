import { Exception, parseInt } from '@libs/commons';
import { ErrorCode, Microservices } from '@libs/const';
import { order_proto } from '@libs/proto/controller/order';
import { warehouse_proto } from '@libs/proto/warehouse';
import { SupabaseService } from '@libs/supabase';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderServiceService implements OnModuleInit {
  private whService: warehouse_proto.WarehouseService;

  /**
   *
   */
  constructor(
    @Inject(Microservices.WarehouseService.inject)
    private readonly grpcWh: ClientGrpcProxy,
    private readonly supabase: SupabaseService,
  ) {}
  onModuleInit() {
    this.whService = this.grpcWh.getService<warehouse_proto.WarehouseService>(
      Microservices.WarehouseService.service,
    );
  }
  async checkout(
    input: order_proto.CheckoutRequest,
  ): Promise<{ orderId: number }> {
    const reserveStock = await firstValueFrom(
      this.whService.reserveStock({
        items: input.items,
        shopId: input.shopId,
      }),
    );
    if (!reserveStock?.responseHeader?.success) {
      throw new Exception(
        reserveStock?.responseHeader?.message,
        parseInt(
          reserveStock?.responseHeader?.code,
          ErrorCode.ReserveCheckoutWarehouse,
        ),
      );
    }
    const mappedReserve = Object.fromEntries(
      reserveStock.data.map(({ price, warehouseId, productId }) => [
        productId,
        { price, warehouseId },
      ]),
    );
    console.log(mappedReserve);
    await this.supabase.client.rpc('create_order', {
      user_id: input.userId,
      shop_id: input.shopId,
      items: input.items.map((it) => {
        return {
          product_id: it.productId,
          warehouse_id: mappedReserve[it.productId].warehouseId,
          price: mappedReserve[it.productId].price,
          quantity: it.quantity,
        };
      }),
    });
    return { orderId: 0 };
  }
  getHello(): string {
    return 'Hello World!';
  }
}
