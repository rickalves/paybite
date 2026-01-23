// infrastructure/messaging/event-publisher.service.ts
// Serviço para publicar eventos via mensageria (RabbitMQ).
// Usa a lib @ibieats/messaging para abstrair o broker.
// Publica eventos de domínio para outros serviços.

import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@ibieats/messaging';
import {
  RABBITMQ_EXCHANGE,
  ORDER_PUBLISHED_ROUTING_KEY,
} from '@ibieats/shared';

@Injectable()
export class EventPublisherService {
  constructor(private readonly publisher: EventPublisher) {}

  async publish(event: any, routingKey?: string): Promise<void> {
    const rk = routingKey || ORDER_PUBLISHED_ROUTING_KEY || '';
    await this.publisher.publish(RABBITMQ_EXCHANGE, rk, event.toJSON());
  }
}
