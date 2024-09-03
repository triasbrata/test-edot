import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductServiceService } from './product-service.service';
import { SentryModule } from '@sentry/nestjs/setup';
import { SentryGlobalFilter } from '@libs/sentry/sentry-global-filter/sentry-global.filter';
import { APP_FILTER } from '@nestjs/core';
import { SupabaseModule } from '@libs/supabase';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { ClientModuleGRPCService } from '@libs/const';
@Module({
  imports: [
    SentryModule.forRoot(),
    SupabaseModule.forRoot(),
    ClientModuleGRPCService.registerWarehouse(),
    ConfigModule.forRoot({
      envFilePath: ['.env.product-service', '.env.product-service.dev'].map(
        (it) => {
          const newPath = resolve(it);
          return newPath;
        },
      ),
    }),
  ],
  controllers: [ProductServiceController],
  providers: [
    ProductServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
  exports: [ProductServiceService],
})
export class ProductServiceModule {}
