import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/Entities/users.entity';
import { UsersRepository } from 'src/Repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth(): string {
    return 'Authenticated...';
  }

  async singIn(email: string, password: string) {
    // Verificamos que el email exista
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('invalid credentials');

    // Verificamos que el password exista
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new BadRequestException('invalid credentials');

    // Generamos el token
    const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Logged in successfully',
      token,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
