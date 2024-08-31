/* eslint-disable prettier/prettier */
import { Request } from 'express';

export interface CustomRequest extends Request {
  user: {
    id: number;
    nome: string;
    email: string;
  };
}
