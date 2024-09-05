import { Controller } from '@nestjs/common';
import { ProductServiceService } from './product-service.service'; // Assuming you have a ProductServiceService
import { GrpcMethod } from '@nestjs/microservices';
import { Microservices } from '@libs/const/index';
import { product_proto } from '@libs/proto/controller/product'; // Adjust path as necessary
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class ProductServiceController implements product_proto.ProductService {
  constructor(private readonly productServiceService: ProductServiceService) {}
  @GrpcMethod(Microservices.ProductService.service)
  async listProducts(
    data: product_proto.ListProductsRequest,
  ): Promise<product_proto.ListProductsResponse> {
    const res: product_proto.ListProductsResponse = {
      responseHeader: {
        success: false,
      },
    };
    try {
      const products = await this.productServiceService.getProductData(data);
      res.products = products.data;
      res.totalPages = Math.ceil(products.totalProducts / data.pageSize);
      res.currentPage = data.pageNumber;
      res.totalProducts = products.totalProducts;
    } catch (error) {
      console.error(error);
      if ('code' in error) {
        res.responseHeader.code = error.code;
      }
      res.responseHeader.message = error.message;
    }

    return res;
  }
}
