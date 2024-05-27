import { Endpoins } from 'src/common/constants/endpoins.constant';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import {
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Res,
  Controller,
  Req,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(Endpoins.GET_ALL_ORDER)
  @HttpCode(HttpStatus.OK)
  async getAllOrder(@Req() req: Request, @Res() res: Response) {
    const id_user = req['user']['_id'];
    res.json({
      allOrders: await this.orderService.getAllOrder(id_user),
    });
  }

  @Post(Endpoins.ORDER)
  @HttpCode(HttpStatus.CREATED)
  async order(
    @Req() req: Request,
    @Body() orderInfo: CreateOrderDto,
    @Res() res: Response,
  ) {
    const id_user = req['user']['_id'];
    console.log({ ...orderInfo, id_user });
    await this.orderService.create({ ...orderInfo, id_user });
    const response = {
      success: true,
      mes: 'đặt hàng thành công',
    };
    res.json(response);
  }
}
