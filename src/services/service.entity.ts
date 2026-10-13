import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  service_id!: number;

  @Column({ unique: true })
  service_code!: string;

  @Column()
  service_name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  price!: number;
}