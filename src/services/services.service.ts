import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepo: Repository<Service>,
  ) {}

  findAll() {
    return this.servicesRepo.find();
  }

  findOne(id: number) {
    return this.servicesRepo.findOneBy({ service_id: id });
  }

  create(service: Partial<Service>) {
    return this.servicesRepo.save(service);
  }

  async update(id: number, service: Partial<Service>) {
    await this.servicesRepo.update(id, service);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.servicesRepo.delete(id);
  }
}