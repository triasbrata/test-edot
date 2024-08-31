import { NestFactory } from '@nestjs/core';
import { WarehouseServiceModule } from './warehouse-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WarehouseServiceModule);
  await app.listen(3000);
}
bootstrap();
