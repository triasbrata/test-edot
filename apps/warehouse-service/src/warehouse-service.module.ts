import { Module } from '@nestjs/common';
import { WarehouseServiceController } from './warehouse-service.controller';
import { WarehouseServiceService } from './warehouse-service.service';

@Module({
  imports: [],
  controllers: [WarehouseServiceController],
  providers: [WarehouseServiceService],
})
export class WarehouseServiceModule {}
