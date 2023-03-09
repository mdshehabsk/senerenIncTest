import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exception-filter/global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  const PORT = process.env.PORT || 4000
  await app.listen(PORT);
}
bootstrap();
