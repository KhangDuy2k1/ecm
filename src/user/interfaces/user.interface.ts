import { Document, Types } from 'mongoose';
type Id = Types.ObjectId;
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  phonenumber: number;
  avatar: string;
  role: string;
  cart: Id[];
}
