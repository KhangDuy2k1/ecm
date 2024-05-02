import mongoose, { Document } from 'mongoose';
export interface IProduct extends Document {
  name: string;
  price: number;
  desc: string;
  img: string;
  id_category: mongoose.Types.ObjectId;
}
