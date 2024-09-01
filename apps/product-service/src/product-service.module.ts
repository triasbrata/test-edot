import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductServiceService } from './product-service.service';
import { SentryModule } from '@sentry/nestjs/setup';
import { SentryGlobalFilter } from '@libs/sentry/sentry-global-filter/sentry-global.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [SentryModule.forRoot()],
  controllers: [ProductServiceController],
  providers: [
    ProductServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class ProductServiceModule {}
