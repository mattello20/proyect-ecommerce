import { Injectable } from '@nestjs/common';
import { Products } from 'src/Entities/products.entity';
import { ProductRepository } from 'src/Repositories/products.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductRepository) {}
  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }
  getProuctsById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  updateProduct(id: string, product: Products) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
