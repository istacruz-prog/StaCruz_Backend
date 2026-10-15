import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  service_id!: number;

  @Column({ unique: true })
  service_code!: string;

  @Column()
  service_name!: string;

  @Column()
  description!: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => Number(value),
    },
  })
  price!: number;
}
