/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from '../users/users.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  prioridade: string;

  @Column()
  categorias: string;

  @Column({ type: 'timestamp' })
  prazo: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
