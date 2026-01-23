import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { OrdersModule } from './orders/orders.module';
import { RABBITMQ_EXCHANGE } from '@ibieats/shared';
import { DbModule } from '@ibieats/db';


@Module({
  // Root module configures RabbitMQ and registers global messaging support.
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [{ name: RABBITMQ_EXCHANGE, type: 'topic' }],
      uri: process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672',
    }),
    DbModule,
    OrdersModule,
  ],
  controllers: [],
})
export class AppModule {}
