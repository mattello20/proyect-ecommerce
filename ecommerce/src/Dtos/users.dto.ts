import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/Decorators/matchPassword.decorator';

export class CreateUserDto {
  /**
   * Debe ser un string de entre 3 y 80 carateres
   * @example 'Test User'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo debe contener Letras de la A la Z, sin caracteres especiales'
  })
  name: string;

  /**
   * Debe ser un string con formato email
   * @example 'test@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser un string con un minimo de 8 y maximo de 15 carateres, al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*
   * @example 'Test123%'
   */
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  password: string;

  /**
   * Debe coincidir al password
   * @example 'Test123%'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un string de entre 3 y 80 carateres
   * @example 'test Road
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * Debe ser un number
   * @example '123456789'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string de entre 4 y 20 carateres
   * @example 'Test Country'
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  country: string;

  /**
   * Debe ser un string de entre 5 y 20 carateres
   * @example 'Test City'
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
