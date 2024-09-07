import { SentryModule } from '@sentry/nestjs/setup';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@libs/sentry/sentry-global-filter/sentry-global.filter';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [SentryModule.forRoot(), UserModule, ProductModule, OrderModule],
  providers: [{ provide: APP_FILTER, useClass: SentryGlobalFilter }],
})
export class AppModule {}
