import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [SentryModule.forRoot()],
  controllers: [OrderServiceController],
  providers: [
    OrderServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class OrderServiceModule {}
