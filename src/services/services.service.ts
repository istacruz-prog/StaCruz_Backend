import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const service = await this.servicesRepo.findOneBy({ service_id: id });
    if (!service) {
      throw new NotFoundException(`Service ${id} not found`);
    }
    return service;
  }

  create(service: Partial<Service>) {
    return this.servicesRepo.save(service);
  }

  async update(id: number, service: Partial<Service>) {
    const existingService = await this.servicesRepo.preload({
      ...service,
      service_id: id,
    });
    if (!existingService) {
      throw new NotFoundException(`Service ${id} not found`);
    }
    return this.servicesRepo.save(existingService);
  }

  async remove(id: number) {
    const result = await this.servicesRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Service ${id} not found`);
    }
    return { deleted: true };
  }
}