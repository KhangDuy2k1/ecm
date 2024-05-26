import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
type Id = Types.ObjectId;
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  desc: string;
  @IsString()
  @IsNotEmpty()
  img: string;
  @IsMongoId()
  id_category: Id;
}
