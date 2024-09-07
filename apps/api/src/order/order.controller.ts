import { Body, Controller, Headers, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { order_proto } from '@libs/proto/order';
import { firstValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async handleCreateOrder(
    @Body() order: order_proto.CheckoutRequest,
    @Headers('token') tokenUser: string,
  ) {
    const validUser = await this.orderService.validateUser(tokenUser);
    return this.orderService.createOrder({ ...order, userId: validUser.id });
  }
}
