import { Exception } from '@libs/commons';
import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { captureException } from '@sentry/nestjs';

@Catch()
export class SentryGlobalFilter<T extends Error> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.error(exception);
    captureException(exception);
    let msg: any = 'bad requst';
    if ('message' in exception) {
      msg = exception.message;
    }
    const code =
      'code' in exception
        ? !isNaN(Number(exception.code))
          ? Number(exception.code)
          : 404
        : 404;
    return super.catch(new Exception(msg, code), host);
  }
}
