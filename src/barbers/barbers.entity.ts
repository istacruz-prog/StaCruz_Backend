import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('barbers')
export class Barber {
  @PrimaryGeneratedColumn()
  barber_id!: number;

  @Column()
  barber_code!: string;

  @Column()
  barber_name!: string;

  @Column()
  phone_number!: string;

  @Column()
  is_active!: boolean;
}