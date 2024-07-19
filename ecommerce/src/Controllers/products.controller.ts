import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Decorators/roles.decorator';
import { Products } from 'src/Entities/products.entity';
import { AuthGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Role } from 'src/Roles/roles.enum';
import { ProductService } from 'src/Services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productService.getProducts(Number(page), Number(limit));
  }

  @Get('seeder')
  addProducts() {
    return this.productService.addProducts();
  }

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.productService.getProuctsById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() products: Products,
  ) {
    return this.productService.updateProduct(id, products);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
