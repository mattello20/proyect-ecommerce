import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from 'src/Controllers/categories.controller';
import { Categories } from 'src/Entities/categories.entity';
import { CategoriesRepository } from 'src/Repositories/categories.repository';
import { CategoriesService } from 'src/Services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
