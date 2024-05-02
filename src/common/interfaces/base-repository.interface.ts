import { Types } from 'mongoose';

type Id = Types.ObjectId;
export interface Repository<T> {
  create(data: any): Promise<void>;
  update(id: Id, data: any): Promise<void>;
  findById(id: Id): Promise<T>;
  findOne(condition?: any): Promise<T>;
  findAll(condition?: any): Promise<T[]>;
  delete(id: Id): Promise<void>;
}
