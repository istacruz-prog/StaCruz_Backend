import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  appointment_id!: number;

  @Column()
  booking_code!: string;

  @Column()
  client_id!: number;

  @Column()
  barber_id!: number;

  @Column()
  service_id!: number;

  @Column()
  appointment_date!: Date;

  @Column()
  start_time!: string;

  @Column({ type: 'varchar', nullable: true })
  notes!: string | null;
}