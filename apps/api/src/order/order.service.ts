import { parseInt } from '@libs/commons';
import { Microservices } from '@libs/const';
import { order_proto } from '@libs/proto/order';
import { user_proto } from '@libs/proto/user';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService implements OnModuleInit {
  userService: user_proto.UserService;
  async validateUser(tokenUser: string) {
    console.log({ tokenUser });

    const resp = await firstValueFrom(
      this.userService.validateUser({
        token: tokenUser,
      }),
    );
    console.log({ resp });
    if (!resp?.responseHeader?.success) {
      throw new UnauthorizedException(resp?.responseHeader?.message);
    }
    return resp.user;
  }
  createOrder(order: order_proto.CheckoutRequest) {
    return this.orderService.checkout({
      items: order.items.map((it) => ({
        productId: parseInt(it.productId, 0),
        quantity: parseInt(it.quantity, 0),
      })),
      shopId: parseInt(order.shopId, 0),
      userId: parseInt(order.userId, 0),
    });
  }
  private orderService: order_proto.OrderService;
  constructor(
    @Inject(Microservices.OrderService.inject)
    private readonly grpcProxy: ClientGrpcProxy,
    @Inject(Microservices.UserService.inject)
    private readonly grpcProxyUser: ClientGrpcProxy,
  ) {}
  onModuleInit() {
    this.orderService = this.grpcProxy.getService<order_proto.OrderService>(
      Microservices.OrderService.service,
    );
    this.userService = this.grpcProxyUser.getService<user_proto.UserService>(
      Microservices.UserService.service,
    );
  }
}
