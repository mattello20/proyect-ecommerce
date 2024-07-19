import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from '../Controllers/users.controller';
import { UsersService } from '../Services/users.service';
import { LoggerMiddleware } from 'src/Middlewares/logger.middleware';
import { UsersRepository } from 'src/Repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users.entity';
import { AuthService } from 'src/Services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
