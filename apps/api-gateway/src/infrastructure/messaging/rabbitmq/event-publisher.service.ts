import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@ibieats/messaging';
import {
  RABBITMQ_EXCHANGE,
  ORDER_REQUESTED_ROUTING_KEY,
} from '@ibieats/shared';

@Injectable()
export class EventPublisherService {
  constructor(private readonly eventPublisher: EventPublisher) {}

  async publish(event: unknown): Promise<void> {
    await this.eventPublisher.publish(
      RABBITMQ_EXCHANGE,
      ORDER_REQUESTED_ROUTING_KEY,
      event,
    );
  }
}
