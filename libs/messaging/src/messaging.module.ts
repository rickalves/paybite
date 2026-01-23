import { Global, Module } from '@nestjs/common';
import { EventPublisher } from './event-publisher';
import { EventSubscriber } from './event-subscriber';

@Global()
@Module({
  // Do not import RabbitMQModule here. Applications must call
  // `RabbitMQModule.forRoot(...)` in their root module so a single
  // configured `AmqpConnection` provider is available to consume.
  providers: [EventPublisher, EventSubscriber],
  exports: [EventPublisher, EventSubscriber],
})
export class MessagingModule {}
