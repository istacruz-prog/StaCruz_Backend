import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('barbers')
export class Barber {
  @PrimaryGeneratedColumn()
  barber_id!: number;

  @Column({ unique: true })
  barber_code!: string;

  @Column()
  barber_name!: string;

  @Column()
  phone_number!: string;

  @Column({ default: true })
  is_active!: boolean;
}