import { Module } from '@nestjs/common';
import { WarehouseServiceController } from './warehouse-service.controller';
import { WarehouseServiceService } from './warehouse-service.service';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SupabaseModule } from '@libs/supabase';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { SentryGlobalFilter } from '@libs/sentry/sentry-global-filter/sentry-global.filter';
import { RedisModule } from '@libs/commons';

@Module({
  imports: [
    SentryModule.forRoot(),
    SupabaseModule.forRoot(),
    RedisModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.warehouse-service', '.env.warehouse-service.dev'].map(
        (it) => {
          const newPath = resolve(it);
          return newPath;
        },
      ),
    }),
  ],
  controllers: [WarehouseServiceController],
  providers: [
    WarehouseServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class WarehouseServiceModule {}
