import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}