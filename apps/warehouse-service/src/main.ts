import { NestFactory } from '@nestjs/core';
import { WarehouseServiceModule } from './warehouse-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import * as path from 'path';
const protoPath = path.join(path.resolve('proto'), 'warehouse.proto');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WarehouseServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: Microservices.WarehouseService.url,
        protoPath: protoPath,
        package: Microservices.WarehouseService.package,
      },
    },
  );
  await app.listen();
}
bootstrap();
