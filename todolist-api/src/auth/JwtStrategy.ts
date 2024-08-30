/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: jwtPayload) {
    const user = await this.authService.validateUserByPayload(payload);
    if (!user) throw new UnauthorizedException('Usuário não validado');
    return user;
  }
}
