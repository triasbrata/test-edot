import { DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';

export const Microservices = {
  UserService: {
    package: 'user_proto',
    url: 'localhost:5001',
    inject: 'user-service',
    service: 'UserService',
  },
  OrderService: {
    package: 'order_proto',
    url: 'localhost:5002',
    inject: 'order-service',
    service: 'OrderService',
  },
  WarehouseService: {
    package: 'warehouse_proto',
    url: 'localhost:5003',
    inject: 'warehouse-service',
    service: 'WarehouseService',
  },
  ProductService: {
    package: 'product_proto',
    url: 'localhost:5004',
    inject: 'product-service',
    service: 'ProductService',
  },
  ShopService: {
    package: 'shop_proto',
    url: 'localhost:5005',
    inject: 'shop-service',
    service: 'ShopService',
  },
};
export class ClientModuleGRPCService {
  static registerUser(): DynamicModule {
    const protoPath = join(resolve('proto'), 'user.proto');
    return ClientsModule.register([
      {
        name: Microservices.UserService.inject,
        transport: Transport.GRPC,
        options: {
          package: Microservices.UserService.package,
          protoPath: protoPath,
          url: Microservices.UserService.url,
        },
      },
    ]);
  }
  static registerWarehouse(): DynamicModule {
    const protoPath = join(resolve('proto'), 'warehouse.proto');
    return ClientsModule.register([
      {
        name: Microservices.WarehouseService.inject,
        transport: Transport.GRPC,
        options: {
          package: Microservices.WarehouseService.package,
          protoPath: protoPath,
          url: Microservices.WarehouseService.url,
        },
      },
    ]);
  }
  static registerProduct(): DynamicModule {
    const protoPath = join(resolve('proto'), 'product.proto');
    return ClientsModule.register([
      {
        name: Microservices.ProductService.inject,
        transport: Transport.GRPC,
        options: {
          package: Microservices.ProductService.package,
          protoPath: protoPath,
          url: Microservices.ProductService.url,
        },
      },
    ]);
  }
  static registerOrder(): DynamicModule {
    const protoPath = join(resolve('proto'), 'order.proto');
    return ClientsModule.register([
      {
        name: Microservices.OrderService.inject,
        transport: Transport.GRPC,
        options: {
          package: Microservices.OrderService.package,
          protoPath: protoPath,
          url: Microservices.OrderService.url,
        },
      },
    ]);
  }
}
