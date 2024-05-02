import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    ProductModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [],
})
export class CategoryModule {}
