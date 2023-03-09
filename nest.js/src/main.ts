import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exception-filter/global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(4000);
}
bootstrap();
