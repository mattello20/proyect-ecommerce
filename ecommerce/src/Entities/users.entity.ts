import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class Users {
  @ApiProperty({
    description: 'el ID es un uuid en su version 4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:
      'El nombre, debe ser un string y de tipo varchar de 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description:
      'El correo, debe ser un string y de tipo varchar de 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @ApiProperty({
    description:
      'La contraseña, debe ser un string y de tipo varchar de 128 caracteres',
  })
  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  @ApiProperty({
    description: 'El phone, debe ser un number y de tipo entero',
  })
  @Column({ type: 'int' })
  phone: number;

  @ApiProperty({
    description:
      'El country, debe ser un string y de tipo varchar de 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50 })
  country: string;

  @ApiProperty({
    description: 'El address, debe ser un string y de tipo texto',
  })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({
    description:
      'La ciudad, debe ser un string y de tipo varchar de 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
