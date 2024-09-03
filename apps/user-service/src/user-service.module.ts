import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SupabaseModule } from '@libs/supabase';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EnvVarUserService } from './const';
import { BcryptModule } from '@libs/bcrypt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(cfg: ConfigService) {
        return {
          secret: cfg.getOrThrow(EnvVarUserService.JWT_SECRET),
        };
      },
      imports: [ConfigModule],
    }),
    BcryptModule,
    SentryModule.forRoot(),
    SupabaseModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.user-service', '.env.user-service.dev'].map((it) => {
        const newPath = resolve(it);
        return newPath;
      }),
    }),
  ],
  controllers: [UserServiceController],
  providers: [
    UserServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class UserServiceModule {}
