/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class UserDTO {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsDateString()
  datanascimento: Date;

  @IsString()
  telefone: string;

  @IsOptional()
  @IsString()
  foto?: string;
}
