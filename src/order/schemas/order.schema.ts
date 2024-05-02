import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
type Id = Types.ObjectId;
@Schema({ timestamps: true })
export class Order extends Document {
  id_user: Id;
  id_product: Id;
  quantity: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
