import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  username: string;
  @IsString()
  password: string;
}
