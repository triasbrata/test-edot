import { SupabaseService } from '@libs/supabase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopServiceService {
  /**
   *
   */
  constructor(private readonly supabase: SupabaseService) {}
  async getSeller() {
    const { data, error } = await this.supabase.client.from('shop').select('*');
    if (error) {
      throw error;
    }
    return data;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
