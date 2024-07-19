import { Module } from '@nestjs/common';
import { ProductController } from '../Controllers/products.controller';
import { ProductService } from '../Services/products.service';
import { ProductRepository } from 'src/Repositories/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { Categories } from 'src/Entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductsModule {}
