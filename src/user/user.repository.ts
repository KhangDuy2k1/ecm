import { Repository } from 'src/common/interfaces/base-repository.interface';
import { IUser } from './interfaces/user.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { ServerErrorException } from 'src/common/exceptions';
export class UserRepository implements Repository<IUser> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(data: any): Promise<void> {
    try {
      await this.userModel.create(data);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async delete(id: Types.ObjectId): Promise<void> {
    try {
      await this.userModel.deleteOne({ _id: id });
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findAll(condition?: any): Promise<IUser[]> {
    try {
      return await this.userModel.find(condition);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findOne(condition?: any): Promise<IUser> {
    try {
      return await this.userModel.findOne(condition);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async findById(id: Types.ObjectId): Promise<IUser> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      console.log(error);
      throw new ServerErrorException('lỗi server');
    }
  }
  async update(id: Types.ObjectId, data: any): Promise<void> {
    try {
      await this.userModel.updateOne({ _id: id }, data);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
}
