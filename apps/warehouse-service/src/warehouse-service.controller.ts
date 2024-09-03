import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

import { warehouse_proto } from '@libs/proto/warehouse'; // Adjust path as necessary
import { Microservices } from '@libs/const/index'; // Adjust path as necessary
import { WarehouseServiceService } from './warehouse-service.service';

@Controller()
export class WarehouseServiceController {
  constructor(
    private readonly warehouseServiceService: WarehouseServiceService,
  ) {}
  @GrpcMethod(Microservices.WarehouseService.service, 'ListStock')
  listStock(data: warehouse_proto.ListStockRequest) {
    // Implement your logic to retrieve stock items
    const res: warehouse_proto.ListStockResponse = {
      stockItems: [
        {
          productId: 1, // Example product ID
          quantity: 100, // Example quantity in stock
        },
        // Add more stock items as needed
      ],
      warehouseId: data.warehouseId,
      warehouseStatus: true, // Example warehouse status
    };
    return of(res);
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'AddStock')
  async addStock(data: warehouse_proto.AddStockRequest) {
    const res: warehouse_proto.AddStockResponse = {
      responseHeader: {
        success: false,
      },
    };
    try {
      let warehouseInfo = await this.warehouseServiceService.getWarehouseInfo(
        data.shopId,
        data.warehouseId,
      );
      console.log({ warehouseInfo });
      if (!warehouseInfo.id) {
        warehouseInfo = await this.warehouseServiceService.createWarehouse(
          data.shopId,
        );
      }
      console.log({ warehouseInfo });
      await this.warehouseServiceService.addStockInformation(
        data.shopId,
        data.price,
        data.productId,
        data.quantity,
        warehouseInfo.id,
      );
      res.responseHeader.success = true;
    } catch (error) {
      console.log({ error });
      res.responseHeader.code = error.code;
      res.responseHeader.message = error.message;
    }
    // Implement your logic to add stock

    return res;
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'EditStock')
  editStock(data: warehouse_proto.EditStockRequest) {
    // Implement your logic to edit stock
    const res: warehouse_proto.EditStockResponse = {
      responseHeader: {
        success: true,
        message: 'Stock edited successfully',
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'RemoveStock')
  removeStock(data: warehouse_proto.RemoveStockRequest) {
    // Implement your logic to remove stock
    const res: warehouse_proto.RemoveStockResponse = {
      responseHeader: {
        success: true,
        message: 'Stock removed successfully',
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'TransferProducts')
  transferProducts(data: warehouse_proto.TransferProductsRequest) {
    // Implement your logic to transfer products
    const res: warehouse_proto.TransferProductsResponse = {
      responseHeader: {
        success: true,
        message: 'Products transferred successfully',
      },
    };
    return of(res);
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'SetWarehouseStatus')
  setWarehouseStatus(data: warehouse_proto.SetWarehouseStatusRequest) {
    // Implement your logic to set warehouse status
    const res: warehouse_proto.SetWarehouseStatusResponse = {
      responseHeader: {
        success: true,
        message: 'Warehouse status updated successfully',
      },
    };
    return of(res);
  }
}
