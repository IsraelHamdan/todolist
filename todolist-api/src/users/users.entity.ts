/* eslint-disable prettier/prettier */

import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ type: 'date' })
  datanascimento: Date;

  @Column({ length: 20 })
  telefone: string;

  @Column({ nullable: true })
  foto: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
