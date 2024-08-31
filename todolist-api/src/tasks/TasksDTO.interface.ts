/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class TaskDTO {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  prioridade?: string;

  @IsString()
  @IsOptional()
  categorias?: string[];

  @IsOptional()
  @IsDateString()
  prazo?: Date;

  @IsNumber()
  userId: number;
}
