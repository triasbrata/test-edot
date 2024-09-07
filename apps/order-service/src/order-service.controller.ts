import { Controller } from '@nestjs/common';
import { OrderServiceService } from './order-service.service'; // Assuming you have an OrderServiceService
import { GrpcMethod } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { order_proto } from '@libs/proto/controller/order'; // Adjust path as necessary

import { Observable, of } from 'rxjs';

@Controller()
export class OrderServiceController implements order_proto.OrderService {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @GrpcMethod(Microservices.OrderService.service)
  async checkout(
    input: order_proto.CheckoutRequest,
  ): Promise<order_proto.CheckoutResponse> {
    const res: order_proto.CheckoutResponse = {
      responseHeader: {
        success: false,
      },
    };
    try {
      const resp = await this.orderServiceService.checkout(input);
      res.orderId = resp.orderId;
    } catch (error) {
      res.responseHeader.code = error.code;
      res.responseHeader.message = error.message;
    }

    return res;
  }
}
