import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { IOrder } from './interfaces/order.interface';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService extends BaseService<IOrder, OrderRepository> {
  constructor(private orderRepository: OrderRepository) {
    super(orderRepository);
  }
  getAllOrder = (id_user: any) => {
    return this.orderRepository.finfAllOrder(id_user);
  };
}
