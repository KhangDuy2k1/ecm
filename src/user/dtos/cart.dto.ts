import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
type Id = Types.ObjectId;
export class CartDto {
  @IsMongoId()
  id_coffee: Id;
}
