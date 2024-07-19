import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/categories.entity';
import { Products } from 'src/Entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = page * limit;
    products = products.slice(start, end);

    return products;
  }
  async addProducts() {
    // Verifico que exista la categoria:
    const categories = await this.categoriesRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      // Cree nuevo Product y seteo atributos:
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;
      // Grabo el nuevo Producto en la base de datos:
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        // Si el producto existe, lo acutalizo:
        .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
        .execute();
    });
    return 'Products created successfully';
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      return `No product found with id: ${id}`;
    }
    return product;
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updateProduct = await this.productsRepository.findOneBy({ id });
    return updateProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      return `No product found with id: ${id}`;
    }
    await this.productsRepository.delete(id);
    return `Product with id: ${id} has been deleted`;
  }
}
