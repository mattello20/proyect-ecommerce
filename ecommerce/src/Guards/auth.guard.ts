import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/Roles/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* Obtenemos contexto de ejecucion:
    const request = context.switchToHttp().getRequest();

    //* Extraemos el token desde header:
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      //* Verificamos el token:
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      //* Adjuntat fecha de expiracion:
      user.exp = new Date(user.exp * 1000);
      user.roles = user.isAdmin ? [Role.Admin] : [Role.User];

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
