import {
  Get,
  Post,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import { Endpoins } from 'src/common/constants/endpoins.constant';
import { UpdateProductDto } from './dtos/update-product.dto';
type Id = Types.ObjectId;
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post(Endpoins.ADD_PRODUCT)
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() dataProduct: CreateProductDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.productService.create(dataProduct);
    res.json({
      success: true,
      message: 'tạo product thành công',
    });
  }

  @Get(Endpoins.GET_ALL_PRODUCT)
  @HttpCode(HttpStatus.OK)
  async getAllProduct(@Res() res: Response): Promise<void> {
    res.json({
      success: true,
      message: 'lấy tất cả product thành công',
      allProducts: await this.productService.findAll(),
    });
  }

  @Delete(Endpoins.DELETE_PRODUCT)
  @HttpCode(HttpStatus.OK)
  async deleteProduct(
    @Param('id') id: Id,
    @Res() res: Response,
  ): Promise<void> {
    await this.productService.delete(id);
    res.json({
      success: true,
      message: 'xóa product thành công',
    });
  }

  @Patch(Endpoins.UPDATE_PRODUCT)
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id') id: Id,
    @Body() dataUpdate: UpdateProductDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.productService.update(id, dataUpdate);
    res.json({
      success: true,
      mes: 'cập nhật thành công',
    });
  }
}
