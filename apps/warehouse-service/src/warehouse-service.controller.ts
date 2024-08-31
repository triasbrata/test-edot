import { Controller, Get } from '@nestjs/common';
import { WarehouseServiceService } from './warehouse-service.service';

@Controller()
export class WarehouseServiceController {
  constructor(private readonly warehouseServiceService: WarehouseServiceService) {}

  @Get()
  getHello(): string {
    return this.warehouseServiceService.getHello();
  }
}
