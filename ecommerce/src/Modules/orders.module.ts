import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from 'src/Controllers/orders.controller';
import { OrderDetails } from 'src/Entities/orderDetails.entity';
import { Orders } from 'src/Entities/orders.entity';
import { Products } from 'src/Entities/products.entity';
import { Users } from 'src/Entities/users.entity';
import { OrderRepository } from 'src/Repositories/orders.repository';
import { OrderService } from 'src/Services/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products])],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
})
export class OrdersModule {}
