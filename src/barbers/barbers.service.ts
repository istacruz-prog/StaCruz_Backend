import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Barber } from './barbers.entity';

@Injectable()
export class BarbersService {
  constructor(
    @InjectRepository(Barber)
    private readonly barbersRepo: Repository<Barber>,
  ) {}

  findAll() {
    return this.barbersRepo.find();
  }

  async findOne(id: number) {
    const barber = await this.barbersRepo.findOneBy({ barber_id: id });
    if (!barber) {
      throw new NotFoundException(`Barber ${id} not found`);
    }
    return barber;
  }

  create(barber: Partial<Barber>) {
    return this.barbersRepo.save(barber);
  }

  async update(id: number, barber: Partial<Barber>) {
    const existingBarber = await this.barbersRepo.preload({
      ...barber,
      barber_id: id,
    });
    if (!existingBarber) {
      throw new NotFoundException(`Barber ${id} not found`);
    }
    return this.barbersRepo.save(existingBarber);
  }

  async remove(id: number) {
    const result = await this.barbersRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Barber ${id} not found`);
    }
    return { deleted: true };
  }
}
