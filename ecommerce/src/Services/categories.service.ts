import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/Repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
