import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { warehouse_proto } from '@libs/proto/controller/warehouse'; // Adjust path as necessary
import { ErrorCode, Microservices } from '@libs/const/index'; // Adjust path as necessary
import { WarehouseServiceService } from './warehouse-service.service';
import { Metadata } from '@grpc/grpc-js';
import { parseInt } from '@libs/commons/parse/parseInt';
import { Exception } from '@libs/commons';

@Controller()
export class WarehouseServiceController
  implements warehouse_proto.WarehouseService
{
  constructor(
    private readonly warehouseServiceService: WarehouseServiceService,
  ) {}
  @GrpcMethod(Microservices.WarehouseService.service)
  async getProductWarehouseInfo(
    data: warehouse_proto.GetProductWarehouseInfoRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<warehouse_proto.GetProductWarehouseInfoResponse> {
    const res: warehouse_proto.GetProductWarehouseInfoResponse = {
      responseHeader: {
        success: false,
      },
    };
    try {
      const productIds = data.productIds;
      if (!Array.isArray(productIds)) {
        throw new Exception(
          'product ids is required',
          ErrorCode.ProductWarehouseInfoProductId,
        );
      }
      const resData =
        await this.warehouseServiceService.getProductWarehouseInfo({
          shopId: data.shopId,
          warehouseIds: data.warehouseIds ?? [],
          productIds: productIds,
        });
      res.responseHeader.success = true;
      res.data = resData;
    } catch (error) {
      res.responseHeader.message = error.message;
      res.responseHeader.code = parseInt(
        error.code,
        ErrorCode.GetProductWarehouseInfoControllerDefault,
      );
    }
    return res;
  }
  @GrpcMethod(Microservices.WarehouseService.service, 'ListStock')
  async listStock(data: warehouse_proto.ListStockRequest) {
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
    return res;
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
      if (!warehouseInfo.id) {
        warehouseInfo = await this.warehouseServiceService.createWarehouse(
          data.shopId,
        );
      }
      await this.warehouseServiceService.addStockInformation(
        data.shopId,
        data.price,
        data.productId,
        data.quantity,
        warehouseInfo.id,
      );
      res.responseHeader.success = true;
    } catch (error) {
      res.responseHeader.code = error.code;
      res.responseHeader.message = error.message;
    }
    // Implement your logic to add stock

    return res;
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'EditStock')
  async editStock(data: warehouse_proto.EditStockRequest) {
    // Implement your logic to edit stock
    const res: warehouse_proto.EditStockResponse = {
      responseHeader: {
        success: true,
        message: 'Stock edited successfully',
      },
    };
    return res;
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'RemoveStock')
  async removeStock(data: warehouse_proto.RemoveStockRequest) {
    // Implement your logic to remove stock
    const res: warehouse_proto.RemoveStockResponse = {
      responseHeader: {
        success: true,
        message: 'Stock removed successfully',
      },
    };
    return res;
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'TransferProducts')
  async transferProducts(data: warehouse_proto.TransferProductsRequest) {
    // Implement your logic to transfer products
    const res: warehouse_proto.TransferProductsResponse = {
      responseHeader: {
        success: true,
        message: 'Products transferred successfully',
      },
    };
    return res;
  }

  @GrpcMethod(Microservices.WarehouseService.service, 'SetWarehouseStatus')
  async setWarehouseStatus(data: warehouse_proto.SetWarehouseStatusRequest) {
    // Implement your logic to set warehouse status
    const res: warehouse_proto.SetWarehouseStatusResponse = {
      responseHeader: {
        success: true,
        message: 'Warehouse status updated successfully',
      },
    };
    return res;
  }
}
