/* eslint-disable @typescript-eslint/no-namespace */
/**
 * This file is auto-generated by nestjs-proto-gen-ts
 */

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace order_proto {
  export interface OrderService {
    // API for placing an order and reserving stock for the items in the order
    checkout(
      data: CheckoutRequest,
      metadata?: Metadata,
      ...rest: any[]
    ): Promise<CheckoutResponse>;
  }
  export interface CheckoutRequest {
    // ID of the customer placing the order
    userId?: number;
    // List of items in the order, each including product ID and quantity
    items?: CheckoutRequest.OrderItem[];
    // ID of the shop where the order is being placed
    shopId?: number;
  }
  export namespace CheckoutRequest {
    export interface OrderItem {
      // ID of the product being ordered
      productId?: string;
      // Quantity of the product to reserve during checkout
      quantity?: number;
    }
  }
  export interface CheckoutResponse {
    // Header for the response
    responseHeader?: common_proto.MessageResponseHeader;
    // Unique ID assigned to the created order
    orderId?: number;
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
