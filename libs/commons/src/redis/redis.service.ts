import { Inject, Injectable } from '@nestjs/common';
import { InjectName } from './const';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  /**
   *
   */
  constructor(
    @Inject(InjectName.REDIS_IP) ip: string,
    @Inject(InjectName.REDIS_PORT) port: string | number,
  ) {
    super(Number(port), ip);
  }
}
