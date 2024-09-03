import { Module } from '@nestjs/common';
import { ShopServiceController } from './shop-service.controller';
import { ShopServiceService } from './shop-service.service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SupabaseModule } from '@libs/supabase';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

@Module({
  imports: [
    SentryModule.forRoot(),
    SupabaseModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.shop-service', '.env.shop-service.dev'].map((it) => {
        const newPath = resolve(it);
        return newPath;
      }),
    }),
  ],
  controllers: [ShopServiceController],
  providers: [
    ShopServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
  exports: [ShopServiceService],
})
export class ShopServiceModule {}
