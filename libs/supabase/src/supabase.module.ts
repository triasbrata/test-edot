import { DynamicModule, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { EnvVar, InjectProvider } from './const';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class SupabaseModule {
  static forRoot(): DynamicModule {
    return {
      imports: [ConfigModule],
      module: SupabaseModule,
      providers: [
        SupabaseService,
        {
          provide: InjectProvider.PROJECT_URL,
          useFactory(cfg: ConfigService) {
            return cfg.getOrThrow<string>(EnvVar.SUPABASE_PROJECT_URL);
          },
          inject: [ConfigService],
        },
        {
          provide: InjectProvider.SERVICE_KEY,
          useFactory(cfg: ConfigService) {
            return cfg.getOrThrow<string>(EnvVar.SUPABASE_SERVICE_KEY);
          },
          inject: [ConfigService],
        },
      ],
      exports: [SupabaseService],
    };
  }
}
