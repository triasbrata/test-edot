import '@libs/sentry/sentry';
import { NestFactory } from '@nestjs/core';
import { ShopServiceModule } from './shop-service.module';
import * as path from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
const protoPath = path.join(path.resolve('proto'), 'shop.proto');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ShopServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: Microservices.ShopService.url,
        protoPath: protoPath,
        package: Microservices.ShopService.package,
      },
    },
  );
  await app.listen();
}
bootstrap();
