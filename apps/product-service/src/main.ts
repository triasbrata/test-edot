import '@libs/sentry/sentry';
import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import * as path from 'path';
const protoPath = path.join(path.resolve('proto'), 'product.proto');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: Microservices.ProductService.url,
        protoPath: protoPath,
        package: Microservices.ProductService.package,
      },
    },
  );
  await app.listen();
}
bootstrap();
