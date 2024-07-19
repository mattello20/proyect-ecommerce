import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private UsersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.UsersRepository.find({
      take: limit,
      skip: skip,
    });
    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUsersById(id: string) {
    const user = await this.UsersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      return `No user found with id: ${id}`;
    }
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async createUser(user: Partial<Users>) {
    const newUser = await this.UsersRepository.save(user);
    const dbUser = await this.UsersRepository.findOneBy({ id: newUser.id });
    const { password, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Users) {
    await this.UsersRepository.update(id, user);
    const updatedUser = await this.UsersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.UsersRepository.findOneBy({ id });
    this.UsersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.UsersRepository.findOneBy({ email });
  }

  async updateUserAdmin(id: string) {
    const user = await this.UsersRepository.findOneBy({ id });
    if (!user) throw new BadGatewayException('Users not found');

    console.log(user);

    user.isAdmin = true;
    await this.UsersRepository.save(user);
    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }
}
