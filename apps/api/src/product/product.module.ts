import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ClientModuleGRPCService } from '@libs/const';

@Module({
  imports: [ClientModuleGRPCService.registerProduct()],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
