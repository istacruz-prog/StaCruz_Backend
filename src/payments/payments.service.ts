import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  findAll() {
    return this.paymentsRepository.find();
  }

  async findOne(id: number) {
    const payment = await this.paymentsRepository.findOneBy({
      payment_id: id,
    });
    if (!payment) {
      throw new NotFoundException(`Payment ${id} not found`);
    }
    return payment;
  }

  create(payment: Partial<Payment>) {
    return this.paymentsRepository.save(payment);
  }

  async update(id: number, payment: Partial<Payment>) {
    const existingPayment = await this.paymentsRepository.preload({
      ...payment,
      payment_id: id,
    });
    if (!existingPayment) {
      throw new NotFoundException(`Payment ${id} not found`);
    }
    return this.paymentsRepository.save(existingPayment);
  }

  async remove(id: number) {
    const result = await this.paymentsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Payment ${id} not found`);
    }
    return { deleted: true };
  }
}