import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientModuleGRPCService } from '@libs/const';

@Module({
  imports: [
    ClientModuleGRPCService.registerOrder(),
    ClientModuleGRPCService.registerUser(),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
