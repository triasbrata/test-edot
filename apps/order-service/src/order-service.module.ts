import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@libs/sentry/sentry-global-filter/sentry-global.filter';
import { ClientModuleGRPCService } from '@libs/const';
import { SupabaseModule } from '@libs/supabase';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.order-service', '.env.order-service.dev'].map(
        (it) => {
          const newPath = resolve(it);
          return newPath;
        },
      ),
    }),
    ClientModuleGRPCService.registerWarehouse(),
    SupabaseModule.forRoot(),
  ],
  controllers: [OrderServiceController],
  providers: [
    OrderServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class OrderServiceModule {}
