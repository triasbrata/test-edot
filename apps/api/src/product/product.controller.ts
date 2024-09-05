import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  handleListProduct(
    @Param('search') search: string,
    @Param('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Param('size', new ParseIntPipe({ optional: true })) size: number = 15,
    @Param('ob') orderBy: string = 'id',
    @Param('or') orderRule: string = 'asc',
  ) {
    return this.productService.getProducts({
      search,
      page,
      size,
      orderBy,
      orderRule,
    });
  }
}
