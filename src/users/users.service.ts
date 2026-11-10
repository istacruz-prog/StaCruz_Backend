import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  private static readonly passwordSaltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>) {
    const username = data.username?.trim();
    if (!username || !data.password) {
      throw new BadRequestException('A username and password are required');
    }

    if (await this.userRepository.findOneBy({ username })) {
      throw new ConflictException('Username is already taken');
    }

    const user = await this.userRepository.save({
      ...data,
      username,
      password: await hash(data.password, UsersService.passwordSaltRounds),
    });

    return this.withoutPassword(user);
  }

  findByUsernameWithPassword(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: Partial<User>) {
    const update = { ...data, user_id: id };
    if (data.password !== undefined) {
      update.password = await hash(
        data.password,
        UsersService.passwordSaltRounds,
      );
    }

    const existingUser = await this.userRepository.preload(update);
    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }

    const user = await this.userRepository.save(existingUser);
    return this.withoutPassword(user);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return { deleted: true };
  }

  private withoutPassword(user: User): Omit<User, 'password'> {
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
