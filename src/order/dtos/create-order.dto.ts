import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsMongoId()
  id_product: any;
  @IsString()
  address: string;
  @IsString()
  phonenumber: string;
  @IsNumber()
  quantity: number;
}
