import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ErrorCode, Microservices } from '@libs/const/index';
import { user_proto } from '@libs/proto/controller/user';
import { Exception } from '@libs/commons';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class UserServiceController implements user_proto.UserService {
  constructor(private readonly userServiceService: UserServiceService) {}
  @GrpcMethod(Microservices.UserService.service)
  async login(data: user_proto.LoginRequest) {
    const resp: user_proto.LoginResponse = {
      responseHeader: {
        success: false,
      },
      user: {},
    };
    try {
      const dataUser = await this.userServiceService.getDatauser(data);
      //compare password
      const validPassword = await this.userServiceService.validatePassword(
        data.password,
        dataUser.password,
      );
      if (!validPassword) {
        throw new Exception('user not found', ErrorCode.InvalidPassword);
      }
      resp.user = {
        email: 'email' in dataUser ? dataUser.email : undefined,
        name: dataUser.name,
        phoneNumber:
          'phone_number' in dataUser ? dataUser.phone_number : undefined,
      };
      resp.token = await this.userServiceService.generateToken({
        ...resp.user,
        id: dataUser.id,
      });
      resp.responseHeader.success = true;
    } catch (error) {
      if ('code' in error) {
        resp.responseHeader.code = error.code;
      }
      resp.responseHeader.message = error.message;
    }
    return resp;
  }

  @GrpcMethod(Microservices.UserService.service)
  async validateUser(
    data: user_proto.ValidateUserRequest,
  ): Promise<user_proto.ValidateUserResponse> {
    const res: user_proto.ValidateUserResponse = {
      responseHeader: {
        success: false,
      },
    };
    try {
      const user = await this.userServiceService.validateToken(data.token);
      res.responseHeader.success = true;
      res.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };
    } catch (error) {
      res.responseHeader.message = error.message;
      res.responseHeader.code = error.code;
    }
    return res;
  }
}
