import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionLoggerFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    console.log('Exception thrown', exception);
    super.catch(exception, host);
  }
}
