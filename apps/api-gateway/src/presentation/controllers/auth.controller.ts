import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: 'password' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: { access_token: { type: 'string' } },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() body: { username: string; password: string }) {
    if (body.username === 'admin' && body.password === 'password') {
      const payload = { sub: 'user-123', username: body.username };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    }
    throw new Error('Invalid credentials');
  }
}
