import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import * as path from 'path';
const protoPath = path.join(path.resolve('proto'), 'user.proto');
console.log({ protoPath });
@Module({
  imports: [
    ClientsModule.register([
      {
        name: Microservices.UserService.inject,
        transport: Transport.GRPC,
        options: {
          package: 'user_proto',
          protoPath: protoPath,
          url: Microservices.UserService.url,
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
