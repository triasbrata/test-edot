import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { captureException } from '@sentry/nestjs';

@Catch()
export class SentryGlobalFilter<T extends Error> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    captureException(exception);
    let msg: any = 'bad requst';
    if ('message' in exception) {
      msg = exception.message;
    }
    return super.catch(new BadRequestException(msg), host);
  }
}
