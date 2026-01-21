import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrdersController } from '@presentation/controllers/orders.controller';
import { AuthController } from '@presentation/controllers/auth.controller';
import { CreateOrderHandler } from '@application/handlers/create-order.handler';
import { EventPublisherService } from '@infrastructure/messaging/rabbitmq/event-publisher.service';
import { JwtStrategy } from '@infrastructure/auth/jwt.strategy';
import { RABBITMQ_EXCHANGE } from '@shared/constants/rabbitmq.constants';

@Module({
  imports: [
    CqrsModule, // Para CQRS
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || 'fallback-secret' }), // Usar env
    RabbitMQModule.forRoot({
      exchanges: [{ name: RABBITMQ_EXCHANGE, type: 'topic' }],
      uri: 'amqp://localhost:5672', // Configurar via env
    }),
  ],
  controllers: [OrdersController, AuthController], // Adicionado AuthController
  providers: [CreateOrderHandler, EventPublisherService, JwtStrategy], // Removido AppService
})
export class AppModule {}
