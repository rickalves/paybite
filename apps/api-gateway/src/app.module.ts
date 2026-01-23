import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EventPublisher } from '@ibieats/messaging';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrdersController } from '@presentation/controllers/orders.controller';
import { AuthController } from '@presentation/controllers/auth.controller';
import { CreateOrderHandler } from '@application/handlers/create-order.handler';
import { JwtStrategy } from '@ibieats/auth';
import { EventPublisherService } from '@infrastructure/messaging/rabbitmq/event-publisher.service';
import { RABBITMQ_EXCHANGE } from '@ibieats/shared';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || 'fallback-secret' }),
    RabbitMQModule.forRoot({
      exchanges: [{ name: RABBITMQ_EXCHANGE, type: 'topic' }],
      uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672/',
    }),
  ],
  controllers: [OrdersController, AuthController],
  providers: [
    CreateOrderHandler,
    EventPublisherService,
    JwtStrategy,
    {
      provide: EventPublisher,
      useFactory: (conn: AmqpConnection) => new EventPublisher(conn),
      inject: [AmqpConnection],
    },
  ],
})
export class AppModule {}
