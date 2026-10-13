import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barber } from './barbers.entity';

@Injectable()
export class BarbersService {
  constructor(
    @InjectRepository(Barber)
    private barbersRepo: Repository<Barber>,
  ) {}

  findAll() {
    return this.barbersRepo.find();
  }

  findOne(id: number) {
    return this.barbersRepo.findOneBy({ barber_id: id });
  }

  create(barber: Partial<Barber>) {
    return this.barbersRepo.save(barber);
  }

  async update(id: number, barber: Partial<Barber>) {
    await this.barbersRepo.update(id, barber);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.barbersRepo.delete(id);
  }
}