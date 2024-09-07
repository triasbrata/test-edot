import { BcryptService } from '@libs/bcrypt';
import { Exception } from '@libs/commons';
import { ErrorCode } from '@libs/const';
import { user_proto } from '@libs/proto/controller/user';
import { SupabaseService } from '@libs/supabase';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginType } from 'apps/api/src/dto/user.dto/user.dto';

@Injectable()
export class UserServiceService {
  async validateToken(token: string) {
    const resp = await this.jwt.verifyAsync(token);
    return resp;
  }
  async getDatauser(data: user_proto.LoginRequest) {
    try {
      return data.type === LoginType.EMAIL
        ? await this.doLoginWithEmail(data.identity)
        : await this.doLoginWithPhoneNumber(data.identity);
    } catch (error) {
      if ('code' in error && error.code === 'PGRST116') {
        throw new Exception('no user found', ErrorCode.NoUserFound);
      }
      throw new Exception(error.message, ErrorCode.DatabaseError);
    }
  }
  async validatePassword(password: string, hashPassword: any) {
    return this.bcrypt.compare(password, hashPassword);
  }
  generateToken(user: Record<string, any>) {
    return this.jwt.signAsync(user);
  }
  async doLoginWithPhoneNumber(phoneNumber: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('id, name, phone_number, password')
      .eq('phone_number', phoneNumber)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }
  async doLoginWithEmail(email: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }
  /**
   *
   */
  constructor(
    private readonly supabase: SupabaseService,
    private readonly jwt: JwtService,
    private readonly bcrypt: BcryptService,
  ) {}
}
