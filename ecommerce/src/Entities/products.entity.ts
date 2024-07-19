import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'products',
})
export class Products {
  @ApiProperty({
    description: 'el ID es un uuid en su version 4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:
      'El nombre, debe ser de tipo string, varchar de 50 caracteres y unico',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({
    description: 'La descripcion, desbe ser un string y de tipo texto',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    description: 'El precio, debe ser un numero y de tipo decimal',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'El stock, debe de ser un string y de tipo entero',
  })
  @Column({
    type: 'int',
  })
  stock: number;

  @ApiProperty()
  @Column({ type: 'text' })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
}
