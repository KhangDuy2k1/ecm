import { Injectable } from '@nestjs/common';
import { Repository } from 'src/common/interfaces/base-repository.interface';
import { ICategory } from './interfaces/category.interface';
import { Model, Types } from 'mongoose';
import { Category } from './schema/category.schema';
import { ServerErrorException } from 'src/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryRepository implements Repository<ICategory> {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async create(data: any): Promise<void> {
    try {
      await this.categoryModel.create(data);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async update(id: Types.ObjectId, data: any): Promise<void> {
    try {
      await this.categoryModel.updateOne({ _id: id }, data);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async delete(id: Types.ObjectId): Promise<void> {
    try {
      await this.categoryModel.deleteOne({ _id: id });
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findAll(condition?: any): Promise<ICategory[]> {
    try {
      return await this.categoryModel.find(condition);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findOne(condition?: any): Promise<ICategory> {
    try {
      return await this.categoryModel.findOne(condition);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findById(id: Types.ObjectId): Promise<ICategory> {
    try {
      return await this.categoryModel.findById(id);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
}
