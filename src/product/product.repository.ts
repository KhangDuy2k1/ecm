import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from 'src/common/interfaces/base-repository.interface';
import { IProduct } from './interfaces/product.interface';
import { Product } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ServerErrorException } from 'src/common/exceptions';

@Injectable()
export class ProductRepository implements Repository<IProduct> {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async create(data: any): Promise<void> {
    try {
      await this.productModel.create(data);
    } catch (error) {
      throw new ServerErrorException('Lỗi server');
    }
  }
  async update(id: Types.ObjectId, data: any): Promise<void> {
    try {
      await this.productModel.updateOne({ _id: id }, data);
    } catch (error) {
      throw new ServerErrorException('Lỗi server');
    }
  }
  async delete(id: Types.ObjectId): Promise<void> {
    try {
      await this.productModel.deleteOne({ _id: id });
    } catch (error) {}
  }
  async findOne(condition?: any): Promise<IProduct> {
    try {
      return await this.productModel.findOne(condition);
    } catch (error) {
      throw new ServerErrorException('Lỗi server');
    }
  }
  async findById(id: Types.ObjectId): Promise<IProduct> {
    try {
      return await this.productModel.findById(id);
    } catch (error) {
      throw new ServerErrorException('Lỗi server');
    }
  }
  async findAll(condition?: any): Promise<IProduct[]> {
    try {
      return await this.productModel.find(condition);
    } catch (error) {
      throw new ServerErrorException('Lỗi server');
    }
  }
}
