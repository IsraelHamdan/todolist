/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: number, password: string): Promise<any> {
    const userToValidate = await this.userService.findOne(id);
    if (
      userToValidate &&
      (await bcrypt.compare(password, userToValidate.senha))
    ) {
      const { ...result } = userToValidate;
      return result;
    } else {
      throw new UnauthorizedException('Dados invalidos');
    }
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload: jwtPayload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = this.jwtService.sign(payload, { expiresIn: '12h' });
    return { access_token: token };
  }

  async validateUserByPayload(payload: jwtPayload): Promise<any> {
    const user = await this.userService.findOne(payload.sub);
    if (!user) throw new UnauthorizedException('Invalid token');
    return user;
  }
}
