import { Module } from '@nestjs/common';
import { ShopServiceController } from './shop-service.controller';
import { ShopServiceService } from './shop-service.service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [SentryModule.forRoot()],
  controllers: [ShopServiceController],
  providers: [
    ShopServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class ShopServiceModule {}
