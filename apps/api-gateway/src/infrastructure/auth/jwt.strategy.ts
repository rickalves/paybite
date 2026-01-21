// infrastructure/auth/jwt.strategy.ts
// Estratégia JWT: valida tokens para autenticação.

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Tipo para o payload do JWT (remove any)
interface JwtPayload {
  sub: string; // Subject (user ID)
  username: string; // Username
  iat?: number; // Issued at (opcional)
  exp?: number; // Expiration (opcional)
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret', // Usar env
    });
  }

  async validate(payload: JwtPayload) {
    // Agora tipado!
    return { userId: payload.sub, username: payload.username };
  }
}
