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
    url: 'localhost:5003',
    inject: 'product-service',
    service: 'ProductService',
  },
  ShopService: {
    package: 'shop_proto',
    url: 'localhost:5003',
    inject: 'shop-service',
    service: 'ShopService',
  },
};
