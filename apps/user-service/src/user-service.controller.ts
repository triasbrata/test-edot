import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { user_proto } from '@libs/proto/user';
import { Metadata } from '@grpc/grpc-js';
import { Observable, of } from 'rxjs';

@Controller()
export class UserServiceController implements user_proto.UserService {
  constructor(private readonly userServiceService: UserServiceService) {}
  @GrpcMethod(Microservices.UserService.service)
  login(
    data: user_proto.LoginRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Observable<user_proto.LoginResponse> {
    const res: user_proto.LoginResponse = {
      user: {
        name: 'trias',
        email: 'email.',
        phoneNumber: '08',
      },
      token: 'token',
    };
    return of(res);
  }
}
