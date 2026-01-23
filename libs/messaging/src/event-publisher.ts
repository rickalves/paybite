// libs/messaging/src/event-publisher.ts
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class EventPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(exchange: string, routingKey: string, event: unknown): Promise<void> {
    await this.amqpConnection.publish(exchange, routingKey, event);
  }
}