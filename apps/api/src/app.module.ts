import { SentryModule } from '@sentry/nestjs/setup';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@libs/sentry/sentry-global-filter/sentry-global.filter';
import { UserModule } from './user/user.module';

@Module({
  imports: [SentryModule.forRoot(), UserModule],
  providers: [{ provide: APP_FILTER, useClass: SentryGlobalFilter }],
})
export class AppModule {}
