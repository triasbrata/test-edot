import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientModuleGRPCService } from '@libs/const/index';
@Module({
  imports: [ClientModuleGRPCService.registerUser()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
