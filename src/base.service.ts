import { Types } from 'mongoose';
import { ICrudService } from './common/interfaces/base-crud-service.interface';
import { Repository } from './common/interfaces/base-repository.interface';

export class BaseService<M, R extends Repository<M>>
  implements ICrudService<M>
{
  constructor(private r: R) {}
  async create(data: any): Promise<void> {
    await this.r.create(data);
  }

  async update(id: Types.ObjectId, data: any): Promise<void> {
    await this.r.update(id, data);
  }

  async findAll(condition?: any): Promise<M[]> {
    return this.r.findAll(condition);
  }

  async findById(id: Types.ObjectId): Promise<M> {
    return this.r.findById(id);
  }

  async delete(id: Types.ObjectId): Promise<void> {
    await this.r.delete(id);
  }
}
