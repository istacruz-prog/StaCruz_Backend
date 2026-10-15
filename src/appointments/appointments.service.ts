import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}

  findAll() {
    return this.appointmentsRepository.find();
  }

  async findOne(id: number) {
    const appointment = await this.appointmentsRepository.findOneBy({
      appointment_id: id,
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }
    return appointment;
  }

  create(appointment: Partial<Appointment>) {
    return this.appointmentsRepository.save(appointment);
  }

  async update(id: number, appointment: Partial<Appointment>) {
    const existingAppointment = await this.appointmentsRepository.preload({
      ...appointment,
      appointment_id: id,
    });
    if (!existingAppointment) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }
    return this.appointmentsRepository.save(existingAppointment);
  }

  async remove(id: number) {
    const result = await this.appointmentsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }
    return { deleted: true };
  }
}