import { Injectable } from '@nestjs/common';
import { IOrder } from './interfaces/order.interface';
import { Repository } from 'src/common/interfaces/base-repository.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { ServerErrorException } from 'src/common/exceptions';
@Injectable()
export class OrderRepository implements Repository<IOrder> {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async create(data: any): Promise<void> {
    try {
      await this.orderModel.create(data);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async update(id: Types.ObjectId, data: any): Promise<void> {
    try {
      await this.orderModel.updateOne({ _id: id }, data);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async delete(id: Types.ObjectId): Promise<void> {
    try {
      await this.orderModel.deleteOne({ _id: id });
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findAll(condition?: any): Promise<IOrder[]> {
    try {
      return await this.orderModel.find(condition);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findOne(condition?: any): Promise<IOrder> {
    try {
      return await this.orderModel.findOne(condition);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findById(id: Types.ObjectId): Promise<IOrder> {
    try {
      return await this.orderModel.findById(id);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
}
