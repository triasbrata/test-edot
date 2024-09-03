import { Module } from '@nestjs/common';
import { CliController } from './cli.controller';
import { CliService } from './cli.service';
import { ProductServiceModule } from 'apps/product-service/src/product-service.module';
import { ShopServiceModule } from 'apps/shop-service/src/shop-service.module';

@Module({
  imports: [ProductServiceModule, ShopServiceModule],
  controllers: [CliController],
  providers: [CliService],
})
export class CliModule {}
