import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [SentryModule.forRoot()],
  controllers: [UserServiceController],
  providers: [
    UserServiceService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class UserServiceModule {}
