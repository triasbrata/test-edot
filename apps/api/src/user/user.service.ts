import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LoginDto } from '../dto/user.dto/user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { user_proto } from '@libs/proto/user';

@Injectable()
export class UserService implements OnModuleInit {
  private userGRPCService: user_proto.UserService;
  /**
   *
   */
  constructor(
    @Inject(Microservices.UserService.inject)
    private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.userGRPCService = this.client.getService<user_proto.UserService>(
      Microservices.UserService.service,
    );
  }

  async doLogin(body: LoginDto) {
    return this.userGRPCService.login({
      identity: body.identity,
      type: body.type,
      password: body.password,
    });
  }
}
