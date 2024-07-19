import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/Entities/products.entity';

export class CreateOrderDto {
  /**
   * Debe ser un UUID
   * @example '123e4567-e89b-12d3-a456-426655440000'
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Debe ser un array de Products
   */
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
