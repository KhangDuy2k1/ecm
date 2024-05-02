import { Types } from 'mongoose';

type Id = Types.ObjectId;
export interface Cart {
  quantity: number;
  id_product: Id;
}
