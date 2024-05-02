import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controler';
import { ProductService } from './product.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
  exports: [ProductRepository],
})
export class ProductModule {}
