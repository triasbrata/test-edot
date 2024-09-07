export enum ErrorCode {
  //common error
  DatabaseError = 1,
  //userService
  NoUserFound = 1000,
  InvalidPassword,

  //warehouseService
  NoWarehouseFound = 3000,
  GetProductWarehouseInfoControllerDefault,
  ProductWarehouseInfoProductId,
  FailedGetWarehouseStockReserveStock,

  //orderService
  ReserveCheckoutWarehouse = 4000,
}
