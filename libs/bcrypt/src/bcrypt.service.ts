import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { EnvKeyBcrypt } from './const';

@Injectable()
export class BcryptService {
  private _key: number;
  /**
   *
   */
  constructor(private readonly config: ConfigService) {}
  generatePassword(password: string) {
    return bcrypt.hashSync(password, this.salt);
  }
  compare(password: string, dbPassword: string) {
    return bcrypt.compare(password, dbPassword);
  }
  get salt(): number | string {
    const round = Number(this.key);
    if (isNaN(round)) {
      return this.key;
    }
    return bcrypt.genSaltSync(round);
  }
  private get key() {
    if (this._key) {
      return this._key;
    }
    this._key = this.config.getOrThrow(EnvKeyBcrypt.SALT_KEY);
    return this._key;
  }
}
