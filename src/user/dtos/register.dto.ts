import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  phonenumber: string;
}
