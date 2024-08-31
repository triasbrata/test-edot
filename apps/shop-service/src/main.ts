import { NestFactory } from '@nestjs/core';
import { ShopServiceModule } from './shop-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ShopServiceModule);
  await app.listen(3000);
}
bootstrap();
