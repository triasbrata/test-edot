import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from '../dto/user.dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  handleLogin(@Body() body: LoginDto) {
    return this.userService.doLogin(body);
  }
}
