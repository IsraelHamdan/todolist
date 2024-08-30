/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() user: any, @Res() res: Response) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '12h' });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: 43200000,
    });

    return res.send({ acess_token: token });
  }
}
