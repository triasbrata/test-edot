import { Controller } from '@nestjs/common';
import { ProductServiceService } from './product-service.service'; // Assuming you have a ProductServiceService
import { GrpcMethod } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { product_proto } from '@libs/proto/product'; // Adjust path as necessary

import { Observable, of } from 'rxjs';

@Controller()
export class ProductServiceController implements product_proto.ProductService {
  constructor(private readonly productServiceService: ProductServiceService) {}

  @GrpcMethod(Microservices.ProductService.service)
  listProducts(
    data: product_proto.ListProductsRequest,
  ): Observable<product_proto.ListProductsResponse> {
    // Mock response for demonstration purposes
    const res: product_proto.ListProductsResponse = {
      products: [
        {
          id: 1, // Product ID
          name: 'Sample Product', // Product name
          description: 'This is a sample product', // Product description
          price: 100, // Product price
          stock: 50, // Product stock
          shopId: 1,
        },
        // Add more products as needed
      ],
    };
    return of(res);
  }
}
