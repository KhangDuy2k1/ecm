import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Body,
  Res,
  Param,
} from '@nestjs/common';
import { Endpoins } from 'src/common/constants/endpoins.constant';
import { Types } from 'mongoose';
import { AddCategoryDto } from './dtos/create-category.dto';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { ProductRepository } from 'src/product/product.repository';
type Id = Types.ObjectId;
@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private productRepository: ProductRepository,
  ) {}
  @Post(Endpoins.ADD_CATEGORY)
  @HttpCode(HttpStatus.CREATED)
  async addCategory(
    @Body() dataCategory: AddCategoryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.categoryService.create(dataCategory);
    res.json({
      success: true,
      message: 'tạo category thành công',
    });
  }

  @Get(Endpoins.GET_PRODUCT_BY_ID)
  @HttpCode(HttpStatus.OK)
  async getProductById(
    @Param('id') id: Id,
    @Res() res: Response,
  ): Promise<void> {
    res.json({
      success: true,
      message: 'lấy tất cả product thành công',
      allProductsCategory: await this.productRepository.findAll({
        id_category: id,
      }),
    });
  }

  @Get(Endpoins.GET_ALL_CATEGORY)
  @HttpCode(HttpStatus.OK)
  async getAllCategories(@Res() res: Response): Promise<any> {
    res.json({
      success: true,
      mes: 'Lấy all product thành công',
      allCategories: await this.categoryService.findAll(),
    });
  }
}
