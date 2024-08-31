import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
