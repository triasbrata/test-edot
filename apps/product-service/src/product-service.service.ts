import { faker } from '@faker-js/faker';
import { Microservices } from '@libs/const';
import { product_proto } from '@libs/proto/product';
import { warehouse_proto } from '@libs/proto/warehouse';
import { SupabaseService } from '@libs/supabase';
import { SupabaseErrorCode } from '@libs/supabase/const';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
type getProductDataResp = {
  totalProducts: number;
  data: product_proto.ListProductsResponse.Product[];
};

type mappingWarehouse = Record<number, { quantity: number; price: number }>;
@Injectable()
export class ProductServiceService implements OnModuleInit {
  private readonly eligibleFields = {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
  };
  async getProductData(
    input: product_proto.ListProductsRequest,
  ): Promise<getProductDataResp> {
    const res: getProductDataResp = {
      data: [],
      totalProducts: 0,
    };
    let baseQueryCount = this.supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    if ((input.searchQuery?.length ?? 0) > 0) {
      baseQueryCount = baseQueryCount.textSearch('name', input.searchQuery);
    }
    const queryCount = await baseQueryCount;
    if (queryCount.error && queryCount.error.code != SupabaseErrorCode.NoData) {
      throw queryCount.error;
    }
    res.totalProducts = queryCount.count ?? 0;
    let baseQuery = this.supabase.from('products').select('*');
    if (input.searchQuery) {
      baseQuery = baseQuery.textSearch('name', input.searchQuery);
    }
    const { data: qData, error } = await baseQuery.order(input.sortBy, {
      ascending: input.sortOrder === 'asc',
    });
    if (error && error.code != SupabaseErrorCode.NoData) {
      throw error;
    }
    const shopData: Record<string, number[]> = qData.reduce((prev, it) => {
      prev[it.shop_id] = prev[it.shop_id] ?? [];
      prev[it.shop_id].push(it.id);
      return prev;
    }, {});
    const dataWarehouse = await Promise.all(
      Object.entries(shopData).map(async ([shopId, productIds]) => {
        const resp = await firstValueFrom(
          this.warehouseService.getProductWarehouseInfo({
            shopId: Number(shopId),
            productIds,
          }),
        );
        return resp;
      }),
    );
    const includeInActiveWh = input?.options?.showInactiveWarehouse ?? false;
    const mappingPrice = dataWarehouse.reduce<mappingWarehouse>((prev, it) => {
      if (!it.responseHeader.success) {
        console.error(it);
        return prev;
      }
      return it.data.reduce<mappingWarehouse>((p, it) => {
        if (it.warehouseStatus || includeInActiveWh) {
          p[it.productId] = p[it.productId] ?? {
            price: it.price,
            quantity: 0,
          };
          p[it.productId].quantity += it.quantity;
        }
        return p;
      }, prev);
    }, {});
    res.data = qData.map((it) => {
      return {
        description: it.description,
        name: it.name,
        id: it.id,
        shopId: it.shop_id,
        price: mappingPrice[it.id]?.price ?? 0,
        stock: mappingPrice[it.id]?.quantity ?? 0,
      };
    });
    return res;
  }
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
          name: `${faker.commerce.product()} - ${faker.color.human()} ${faker.commerce.productMaterial()}`,
          description: faker.commerce.productDescription(),
        };
        const res = await this.supabase
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
              quantity: faker.number.int({ min: 1, max: 100 }),
              shopId,
            })
            .pipe(timeout(3000)),
        ),
      ),
    );
  }
}
