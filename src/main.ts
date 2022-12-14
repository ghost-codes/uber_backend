import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie_parser from 'cookie-parser';
import { ExceptionLoggerFilter } from './utils/exceptionLogger.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionLoggerFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookie_parser());
  await app.listen(3000);
}
bootstrap();
