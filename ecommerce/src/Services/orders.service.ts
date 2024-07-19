import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/Repositories/orders.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  addOrder(userId: string, products: any) {
    return this.orderRepository.addOrder(userId, products);
  }

  getOrder(id: string) {
    return this.orderRepository.getOrder(id);
  }
}
