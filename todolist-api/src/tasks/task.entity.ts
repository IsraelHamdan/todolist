/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from '../users/users.entity';

export enum Prioridade {
  ALTISSIMA = 'Altissima',
  ALTA = 'Alta',
  MEDIA = 'Média',
  BAIXA = 'Baixa',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  prioridade: string;

  @Column({ type: 'json', nullable: true })
  categorias: string[];

  @Column({ type: 'timestamp' })
  prazo: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
