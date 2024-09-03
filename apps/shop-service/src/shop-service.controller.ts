import { Controller } from '@nestjs/common';
import { ShopServiceService } from './shop-service.service'; // Assuming you have a ShopServiceService
import { GrpcMethod } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { shop_proto } from '@libs/proto/shop'; // Adjust path as necessary
import { warehouse_proto } from '@libs/proto/warehouse'; // Import warehouse proto for responses

import { Observable, of } from 'rxjs';

@Controller()
export class ShopServiceController implements shop_proto.ShopService {
  constructor(private readonly shopServiceService: ShopServiceService) {}

  @GrpcMethod(Microservices.ShopService.service)
  listWarehouses(
    data: shop_proto.ListWarehousesRequest,
  ): Observable<shop_proto.ListWarehousesResponse> {
    const res: shop_proto.ListWarehousesResponse = {
      warehouses: [
        {
          id: 1, // Warehouse ID
          name: 'Main Warehouse', // Warehouse name
          location: '123 Main St', // Warehouse location
          active: true, // Warehouse active status
        },
        // Add more warehouses as needed
      ],
    };
    return of(res);
  }

  @GrpcMethod(Microservices.ShopService.service)
  addWarehouse(
    data: shop_proto.AddWarehouseRequest,
  ): Observable<shop_proto.AddWarehouseResponse> {
    const res: shop_proto.AddWarehouseResponse = {
      warehouseId: 1, // Newly added warehouse ID
      responseHeader: {
        success: true,
        message: 'ok',
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.ShopService.service)
  listStock(
    data: shop_proto.ShopListStockRequest,
  ): Observable<warehouse_proto.ListStockResponse> {
    // This method should forward the request to WarehouseService and return the response
    // For demonstration purposes, returning a mock response
    const res: warehouse_proto.ListStockResponse = {
      responseHeader: {
        success: true,
        message: 'ok',
      },
      stockItems: [
        {
          productId: 1, // Product ID
          quantity: 100, // Quantity in stock
        },
        // Add more stock items as needed
      ],
      warehouseId: data.warehouseId, // Warehouse ID
      warehouseStatus: true, // Warehouse status
    };
    return of(res);
  }

  @GrpcMethod(Microservices.ShopService.service)
  addStock(
    data: shop_proto.ShopAddStockRequest,
  ): Observable<warehouse_proto.AddStockResponse> {
    const res: warehouse_proto.AddStockResponse = {
      responseHeader: {
        success: true,
        message: 'Stock added successfully', // Additional message
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.ShopService.service)
  editStock(
    data: shop_proto.ShopEditStockRequest,
  ): Observable<warehouse_proto.EditStockResponse> {
    const res: warehouse_proto.EditStockResponse = {
      responseHeader: {
        success: true,
        message: 'Stock edited successfully', // Additional message
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.ShopService.service)
  removeStock(
    data: shop_proto.ShopRemoveStockRequest,
  ): Observable<warehouse_proto.RemoveStockResponse> {
    const res: warehouse_proto.RemoveStockResponse = {
      responseHeader: {
        success: true,
        message: 'Stock removed successfully', // Additional message
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.ShopService.service)
  transferProducts(
    data: shop_proto.ShopTransferProductsRequest,
  ): Observable<warehouse_proto.TransferProductsResponse> {
    const res: warehouse_proto.TransferProductsResponse = {
      responseHeader: {
        success: true,
        message: 'Products transferred successfully', // Additional message
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.ShopService.service)
  setWarehouseStatus(
    data: shop_proto.ShopSetWarehouseStatusRequest,
  ): Observable<warehouse_proto.SetWarehouseStatusResponse> {
    const res: warehouse_proto.SetWarehouseStatusResponse = {
      responseHeader: {
        success: true,
        message: 'Warehouse status updated successfully', // Additional message
      },
    };
    return of(res);
  }
}
