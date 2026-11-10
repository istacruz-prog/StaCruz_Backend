import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { UsersService } from '../users/users.service';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(credentials: Credentials) {
    const { username, password } = this.validateCredentials(credentials);
    return this.usersService.create({ username, password });
  }

  async login(credentials: Credentials) {
    const { username, password } = this.validateCredentials(credentials);
    const user = await this.usersService.findByUsernameWithPassword(username);

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.user_id,
      username: user.username,
      role: user.role,
    });

    return { accessToken };
  }

  private validateCredentials(credentials: Credentials): Credentials {
    if (
      typeof credentials?.username !== 'string' ||
      typeof credentials.password !== 'string' ||
      !credentials.username.trim() ||
      !credentials.password
    ) {
      throw new BadRequestException('Username and password are required');
    }

    return {
      username: credentials.username.trim(),
      password: credentials.password,
    };
  }
}
