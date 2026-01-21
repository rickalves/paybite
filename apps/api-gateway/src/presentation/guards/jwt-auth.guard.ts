// presentation/guards/jwt-auth.guard.ts
// Guard: protege endpoints verificando JWT.

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
