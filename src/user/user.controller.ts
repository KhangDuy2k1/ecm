import {
  Req,
  Res,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Endpoins } from 'src/common/constants/endpoins.constant';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/login.dto';
import { IUser } from './interfaces/user.interface';
type Id = Types.ObjectId;
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post(Endpoins.REGISTER)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Req() req: Request,
    @Body() dataRegister: RegisterDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.userService.create(dataRegister);
    res.json({
      success: true,
      message: 'đăng kí thành công',
    });
  }

  @Post(Endpoins.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Body() dataLogin: LoginDto,
    @Res() res: Response,
  ): Promise<void> {
    const response: any = await this.userService.login(dataLogin);
    res.json(response);
  }

  @Post(Endpoins.ADD_TO_CART)
  @HttpCode(HttpStatus.OK)
  async addToCart(
    @Req() req: Request,
    @Param('id') id_product: Id,
    @Res() res: Response,
  ): Promise<void> {
    const user: IUser = req['user'];
    await this.userService.addToCart(user, id_product);
    res.json({
      success: true,
      message: 'thêm vào giỏ hàng thành công',
    });
  }
}
