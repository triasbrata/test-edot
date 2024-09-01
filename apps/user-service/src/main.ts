import '@libs/sentry/sentry';
import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { Microservices } from '@libs/const/index';
import { ReflectionService } from '@grpc/reflection';
const protoPath = path.join(path.resolve('proto'), 'user.proto');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: Microservices.UserService.url,
        protoPath: protoPath,
        package: Microservices.UserService.package,
        // url: 'localhost:5000',
        // package: 'user_proto',
        // protoPath: protoPath,
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
