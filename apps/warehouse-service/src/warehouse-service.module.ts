import { Module } from '@nestjs/common';
import { WarehouseServiceController } from './warehouse-service.controller';
import { WarehouseServiceService } from './warehouse-service.service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [SentryModule.forRoot()],
  controllers: [WarehouseServiceController],
  providers: [
    WarehouseServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class WarehouseServiceModule {}
