import { DynamicModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvRedis, InjectName } from './const';

@Module({
  imports: [ConfigModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: InjectName.REDIS_IP,
          useFactory(cfg: ConfigService) {
            return cfg.get(EnvRedis.REDIS_IP) ?? '127.0.0.1';
          },
          inject: [ConfigService],
        },
        {
          provide: InjectName.REDIS_PORT,
          useFactory(cfg: ConfigService) {
            return cfg.get(EnvRedis.REDIS_PORT) ?? '6379';
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}
