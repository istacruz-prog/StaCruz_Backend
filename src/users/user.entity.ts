import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'STAFF', 'CLIENT'],
    default: 'CLIENT',
  })
  role!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    unique: true,
  })
  email!: string | null;
}
