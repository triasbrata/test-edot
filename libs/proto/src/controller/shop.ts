/* eslint-disable @typescript-eslint/no-namespace */
/**
 * This file is auto-generated by nestjs-proto-gen-ts
 */

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace shop_proto {
  export interface ShopService {
    // API to retrieve the list of warehouses for a shop
    listWarehouses(
      data: ListWarehousesRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<ListWarehousesResponse>;
    // API to add a new warehouse to a shop
    addWarehouse(
      data: AddWarehouseRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<AddWarehouseResponse>;
    // API to list stock items in a warehouse via WarehouseService
    listStock(
      data: ShopListStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<warehouse_proto.ListStockResponse>;
    // API to add stock to a warehouse via WarehouseService
    addStock(
      data: ShopAddStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<warehouse_proto.AddStockResponse>;
    // API to edit stock in a warehouse via WarehouseService
    editStock(
      data: ShopEditStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<warehouse_proto.EditStockResponse>;
    // API to remove stock from a warehouse via WarehouseService
    removeStock(
      data: ShopRemoveStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<warehouse_proto.RemoveStockResponse>;
    // API to transfer products between warehouses via WarehouseService
    transferProducts(
      data: ShopTransferProductsRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<warehouse_proto.TransferProductsResponse>;
    // API to activate or deactivate a warehouse via WarehouseService
    setWarehouseStatus(
      data: ShopSetWarehouseStatusRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<warehouse_proto.SetWarehouseStatusResponse>;
  }
  export interface ListWarehousesRequest {
    // ID of the shop to retrieve warehouses for
    shopId?: number;
  }
  export interface ListWarehousesResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
    // List of warehouses associated with the shop
    warehouses?: ListWarehousesResponse.Warehouse[];
  }
  export namespace ListWarehousesResponse {
    export interface Warehouse {
      // Unique ID of the warehouse
      id?: number;
      // Name of the warehouse
      name?: string;
      // Location/address of the warehouse
      location?: string;
      // Indicates if the warehouse is active
      active?: boolean;
    }
  }
  export interface AddWarehouseRequest {
    // ID of the shop to which the warehouse is being added
    shopId?: number;
    // Name of the warehouse
    name?: string;
    // Location/address of the warehouse
    location?: string;
  }
  export interface AddWarehouseResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
    // Unique ID of the newly added warehouse
    warehouseId?: number;
  }
  export interface ShopListStockRequest {
    // ID of the warehouse to list stock for
    warehouseId?: number;
  }
  export interface ShopAddStockRequest {
    // ID of the warehouse to add stock to
    warehouseId?: number;
    // ID of the product
    productId?: number;
    // Quantity to add to stock
    quantity?: number;
  }
  export interface ShopEditStockRequest {
    // ID of the warehouse
    warehouseId?: number;
    // ID of the product
    productId?: number;
    // New quantity of the product in stock
    newQuantity?: number;
  }
  export interface ShopRemoveStockRequest {
    // ID of the warehouse
    warehouseId?: number;
    // ID of the product
    productId?: number;
  }
  export interface ShopTransferProductsRequest {
    // ID of the warehouse to transfer products from
    fromWarehouseId?: number;
    // ID of the warehouse to transfer products to
    toWarehouseId?: number;
    // List of products to transfer
    products?: ShopTransferProductsRequest.ProductTransfer[];
  }
  export namespace ShopTransferProductsRequest {
    export interface ProductTransfer {
      // ID of the product
      productId?: number;
      // Quantity to transfer
      quantity?: number;
    }
  }
  export interface ShopSetWarehouseStatusRequest {
    // ID of the warehouse
    warehouseId?: number;
    // true to activate, false to deactivate
    active?: boolean;
  }
}
export namespace warehouse_proto {
  export interface WarehouseService {
    // API to list all stock items in a warehouse
    listStock(
      data: ListStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<ListStockResponse>;
    // API to add new stock for a product in a warehouse
    addStock(
      data: AddStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<AddStockResponse>;
    // API to edit existing stock for a product in a warehouse
    editStock(
      data: EditStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<EditStockResponse>;
    // API to remove stock for a product in a warehouse
    removeStock(
      data: RemoveStockRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<RemoveStockResponse>;
    // API to transfer products between warehouses
    transferProducts(
      data: TransferProductsRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<TransferProductsResponse>;
    // API to activate or deactivate a warehouse
    setWarehouseStatus(
      data: SetWarehouseStatusRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<SetWarehouseStatusResponse>;
    getProductWarehouseInfo(
      data: GetProductWarehouseInfoRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<GetProductWarehouseInfoResponse>;
  }
  export interface GetProductWarehouseInfoRequest {
    productIds?: number[];
    warehouseIds?: number[];
    shopId?: number;
  }
  export interface GetProductWarehouseInfoResponse {
    responseHeader?: common_proto.MessageResponseHeader;
    data?: GetProductWarehouseInfoResponse.ProductWarehouse[];
  }
  export namespace GetProductWarehouseInfoResponse {
    export interface ProductWarehouse {
      warehouseId?: number;
      warehouseStatus?: boolean;
      quantity?: number;
      price?: number;
      productId?: number;
    }
  }
  export interface ListStockRequest {
    // ID of the shop
    shopId?: number;
    // ID of the warehouse to list stock for
    warehouseId?: number;
  }
  export interface ListStockResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
    // List of stock items in the warehouse
    stockItems?: ListStockResponse.StockItem[];
    // ID of the warehouse
    warehouseId?: number;
    // Indicates if the warehouse is active
    warehouseStatus?: boolean;
  }
  export namespace ListStockResponse {
    export interface StockItem {
      // ID of the product
      productId?: number;
      // Quantity of the product in stock
      quantity?: number;
      // Price of the product
      price?: number;
    }
  }
  export interface AddStockRequest {
    // ID of the shop
    shopId?: number;
    // ID of the warehouse to add stock to
    warehouseId?: number;
    // ID of the product
    productId?: number;
    // Quantity to add to stock
    quantity?: number;
    // Price of the product
    price?: number;
  }
  export interface AddStockResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
  }
  export interface EditStockRequest {
    // ID of the shop
    shopId?: number;
    // ID of the warehouse
    warehouseId?: number;
    // ID of the product
    productId?: number;
    // New quantity of the product in stock
    newQuantity?: number;
    // New price of the product
    newPrice?: number;
  }
  export interface EditStockResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
  }
  export interface RemoveStockRequest {
    // ID of the shop
    shopId?: number;
    // ID of the warehouse
    warehouseId?: number;
    // ID of the product
    productId?: number;
  }
  export interface RemoveStockResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
  }
  export interface TransferProductsRequest {
    // ID of the shop
    shopId?: number;
    // ID of the warehouse to transfer products from
    fromWarehouseId?: number;
    // ID of the warehouse to transfer products to
    toWarehouseId?: number;
    // List of products to transfer
    products?: TransferProductsRequest.ProductTransfer[];
  }
  export namespace TransferProductsRequest {
    export interface ProductTransfer {
      // ID of the product
      productId?: number;
      // Quantity to transfer
      quantity?: number;
      // Price of the product
      price?: number;
    }
  }
  export interface TransferProductsResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
  }
  export interface SetWarehouseStatusRequest {
    // ID of the shop
    shopId?: number;
    // ID of the warehouse
    warehouseId?: number;
    // true to activate, false to deactivate
    active?: boolean;
  }
  export interface SetWarehouseStatusResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
  }
}
export namespace common_proto {
  export interface MessageResponseHeader {
    // Status code of the response
    code?: number;
    // Response message (e.g., error or success message)
    message?: string;
    // Whether the request was successful
    success?: boolean;
  }
}
