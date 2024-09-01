import '@libs/sentry/sentry';
import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import * as path from 'path';
const protoPath = path.join(path.resolve('proto'), 'order.proto');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: Microservices.OrderService.url,
        protoPath: protoPath,
        package: Microservices.OrderService.package,
      },
    },
  );
  await app.listen();
}
bootstrap();
