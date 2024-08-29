/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './user_dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: Partial<User>): Promise<User> {
    if (user.senha) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.senha, salt);
      const newUser = this.userRepository.create({
        ...user,
        senha: hashedPassword,
      });
      return this.userRepository.save(newUser);
    } else {
      throw new Error('Senha não fornecida');
    }
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
