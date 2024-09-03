import { Controller, Get } from '@nestjs/common';
import { CliService } from './cli.service';
import { ShopServiceService } from 'apps/shop-service/src/shop-service.service';
import { ProductServiceService } from 'apps/product-service/src/product-service.service';

@Controller()
export class CliController {
  async generateProduct(params: { num: number }) {
    const sellers = await this.ShopServiceService.getSeller();
    if (sellers.length === 0) {
      console.log('No shop data found, create it first');
      return;
    }
    await Promise.all(
      sellers.map((it) =>
        this.ProductServiceService.generateProduct(it.id, params.num),
      ),
    );
  }
  constructor(
    private readonly cliService: CliService,
    private readonly ShopServiceService: ShopServiceService,
    private readonly ProductServiceService: ProductServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.cliService.getHello();
  }
}
