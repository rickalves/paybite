# @ibieats/messaging

Central messaging helpers for the ibieats monorepo.

This package provides an `EventPublisher` (wrapper around `@golevelup/nestjs-rabbitmq`) and an optional `EventSubscriber` helper.

Installation

- The package declares `@golevelup/nestjs-rabbitmq` and `@nestjs/common` as peer dependencies. Install them in your application:

```bash
pnpm add @golevelup/nestjs-rabbitmq @nestjs/common
```

Usage

1. Configure RabbitMQ in your application (example using `api-gateway` AppModule):

```ts
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingModule } from '@ibieats/messaging';

@Module({
	imports: [
		RabbitMQModule.forRoot(RabbitMQModule, {
			exchanges: [],
			uri: process.env.RABBITMQ_URI || 'amqp://localhost',
		}),
		MessagingModule,
	],
})
export class AppModule {}
```

2. Inject `EventPublisher` in your services:

```ts
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@ibieats/messaging';

@Injectable()
export class SomeService {
	constructor(private readonly publisher: EventPublisher) {}

	async send(payload: unknown) {
		await this.publisher.publish('orders.exchange', 'order.requested', payload);
	}
}
```

Subscriber

- For subscribers prefer using `@RabbitSubscribe` decorator in application-level services. `EventSubscriber` is provided but intentionally minimal — apps should define their own handlers using the decorator for clarity.

Notes

- Keep the RabbitMQ configuration in the application modules. This library assumes the app will configure the `RabbitMQModule` and provide a single `AmqpConnection` instance for injection.
