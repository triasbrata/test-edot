import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientModuleGRPCService } from '@libs/const/index';
import * as path from 'path';
const protoPath = path.join(path.resolve('proto'), 'user.proto');
console.log({ protoPath });
@Module({
  imports: [ClientModuleGRPCService.registerUser()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
