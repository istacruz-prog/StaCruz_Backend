import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  findAll() {
    return this.clientsRepository.find();
  }

  async findOne(id: number) {
    const client = await this.clientsRepository.findOneBy({ client_id: id });
    if (!client) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return client;
  }

  create(client: Partial<Client>) {
    return this.clientsRepository.save(client);
  }

  async update(id: number, client: Partial<Client>) {
    const existingClient = await this.clientsRepository.preload({
      ...client,
      client_id: id,
    });
    if (!existingClient) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return this.clientsRepository.save(existingClient);
  }

  async remove(id: number) {
    const result = await this.clientsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return { deleted: true };
  }
}