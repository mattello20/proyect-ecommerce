import { Injectable } from '@nestjs/common';
import { Users } from 'src/Entities/users.entity';
import { UsersRepository } from 'src/Repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUsersById(id: string) {
    return this.usersRepository.getUsersById(id);
  }

  createUser(user: any) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, user: any) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  updateUserAdmin(id: string) {
    return this.usersRepository.updateUserAdmin(id);
  }
}
