import { Microservices } from '@libs/const';
import { product_proto } from '@libs/proto/product';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService implements OnModuleInit {
  private productGrpc: product_proto.ProductService;
  /**
   *
   */
  constructor(
    @Inject(Microservices.ProductService.inject)
    private readonly grpcClient: ClientGrpcProxy,
  ) {}
  onModuleInit() {
    this.productGrpc = this.grpcClient.getService<product_proto.ProductService>(
      Microservices.ProductService.service,
    );
  }
  getProducts(params: {
    search: string;
    page: number;
    size: number;
    orderRule: string;
    orderBy: string;
  }) {
    return this.productGrpc.listProducts({
      searchQuery: params.search,
      pageNumber: params.page,
      pageSize: params.size,
      sortBy: params.orderBy,
      sortOrder: params.orderRule,
    });
  }
}
