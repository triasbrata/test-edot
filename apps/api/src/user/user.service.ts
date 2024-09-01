import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LoginDto, LoginType } from '../dto/user.dto/user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { user_proto } from '@libs/proto/user';
import { map } from 'rxjs';

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
    return this.userGRPCService
      .login({ identity: body.identity, type: body.type })
      .pipe(
        map((it) => {
          console.log(it);
          return it;
        }),
        map((it) => ({
          user: {
            name: it.user.name,
            email: body.type === LoginType.EMAIL ? it.user.email : undefined,
            phoneNumber:
              body.type === LoginType.PHONE ? it.user.phoneNumber : undefined,
          },
          token: it.token,
        })),
      );
  }
}
