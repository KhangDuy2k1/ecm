import { Document, Types } from 'mongoose';
type Id = Types.ObjectId;
export interface IOrder extends Document {
  id_user: Id;
  id_product: Id;
  address: string;
  phonenumber: string;
  quantity: number;
}
