import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { BaseService } from 'src/base.service';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService extends BaseService<IProduct, ProductRepository> {
  constructor(private productRepository: ProductRepository) {
    super(productRepository);
  }
}
