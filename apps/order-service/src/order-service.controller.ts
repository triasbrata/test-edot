import { Controller } from '@nestjs/common';
import { OrderServiceService } from './order-service.service'; // Assuming you have an OrderServiceService
import { GrpcMethod } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { order_proto } from '@libs/proto/order'; // Adjust path as necessary

import { Observable, of } from 'rxjs';

@Controller()
export class OrderServiceController implements order_proto.OrderService {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @GrpcMethod(Microservices.OrderService.service)
  checkout(
    data: order_proto.CheckoutRequest,
  ): Observable<order_proto.CheckoutResponse> {
    // Mock response for demonstration purposes
    const res: order_proto.CheckoutResponse = {
      orderId: 12345, // Generate or fetch an order ID
      responseHeader: {
        code: 0,
        message: 'ok',
        success: true,
      },
    };
    return of(res);
  }
}
