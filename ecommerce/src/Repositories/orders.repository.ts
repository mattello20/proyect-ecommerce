import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/Entities/orderDetails.entity';
import { Orders } from 'src/Entities/orders.entity';
import { Products } from 'src/Entities/products.entity';
import { Users } from 'src/Entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;

    // Verifico que exista el usuario:
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      return `No user found with id: ${userId}`;
    }

    // Creamos la Orden:
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ordersRepository.save(order);

    // Asocio cada "id" recibido con el "Producto"
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          return `No product found with id: ${element.id}`;
        }
        // Calculamos el Monto total:
        total += Number(product.price);
        // Actualizo el stock del producto:
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    // Creo el OrderDatails y la insertamos en BBDD:
    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetailsRepository.save(orderDetail);

    // Envio al cliente la compra con la info de productos:
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) {
      return `No order found with id: ${id}`;
    }
    return order;
  }
}
