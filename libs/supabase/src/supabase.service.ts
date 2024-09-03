import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService<T = any> implements OnModuleInit {
  private supabase: ReturnType<typeof createClient<T>>;
  /**
   *
   */
  constructor(
    @Inject('PROJECT_URL') private readonly project_url: string,
    @Inject('SERVICE_KEY') private readonly service_key: string,
  ) {}
  onModuleInit() {
    this.supabase = createClient(this.project_url, this.service_key);
  }
  get client() {
    return this.supabase;
  }
}
