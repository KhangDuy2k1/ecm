import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
type Id = Types.ObjectId;
@Schema()
export class Product extends Document {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  img: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  id_category: Id;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
