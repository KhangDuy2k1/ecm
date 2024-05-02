import { Types } from 'mongoose';

type Id = Types.ObjectId;
export interface ICrudService<T> {
  create(data: any): Promise<void>;
  findById(id: Id): Promise<T>;
  update(id: Id, data: any): Promise<void>;
  delete(id: Id): Promise<void>;
  findAll(): Promise<T[]>;
}
