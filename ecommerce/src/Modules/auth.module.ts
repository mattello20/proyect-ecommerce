import { Module } from '@nestjs/common';
import { AuthController } from '../Controllers/auth.controller';
import { AuthService } from '../Services/auth.service';
import { UsersRepository } from 'src/Repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
