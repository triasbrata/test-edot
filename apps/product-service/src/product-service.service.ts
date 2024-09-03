import { faker } from '@faker-js/faker';
import { Microservices } from '@libs/const';
import { warehouse_proto } from '@libs/proto/warehouse';
import { SupabaseService } from '@libs/supabase';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class ProductServiceService implements OnModuleInit {
  private warehouseService: warehouse_proto.WarehouseService;
  /**
   *
   */
  constructor(
    private readonly supabase: SupabaseService,
    @Inject(Microservices.WarehouseService.inject)
    private readonly grpcWh: ClientGrpcProxy,
  ) {}
  onModuleInit() {
    this.warehouseService =
      this.grpcWh.getService<warehouse_proto.WarehouseService>(
        Microservices.WarehouseService.service,
      );
  }
  async generateProduct(shopId: number, num: number) {
    const products = await Promise.all(
      Array.from({ length: num }, async () => {
        const payload = {
          shop_id: shopId,
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
        };
        const res = await this.supabase.client
          .from('products')
          .insert(payload)
          .select('id')
          .single();
        return res;
      }),
    );
    const productNotFail = products.filter((it) => !it?.error);
    const createStock = await Promise.all(
      productNotFail.map((it) =>
        firstValueFrom(
          this.warehouseService
            .addStock({
              productId: it.data.id,
              price: Number(
                faker.commerce.price({ min: 1, max: 20000, dec: 0 }),
              ),
              quantity: faker.number.int(),
              shopId,
            })
            .pipe(timeout(3000)),
        ),
      ),
    );
    console.log(createStock);
  }
}
