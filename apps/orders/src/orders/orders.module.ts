// orders/orders.module.ts
// Módulo principal do domínio de pedidos.
// Organiza providers, controllers e imports por camada.
// Segue DDD: mantém dependências claras (domain não depende de infrastructure).

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from '@presentation/controllers/orders.controller';
import { CreateOrderHandler } from '@application/handlers/create-order.handler';
import { OrdersSaga } from '@application/sagas/orders.saga';
import { OrderRepository } from '@infrastructure/repositories/order.repository';
import { EventPublisherService } from '@infrastructure/messaging/event-publisher.service';
// Assumindo imports de libs compartilhadas
import { DbModule } from '@ibieats/db';
import { MessagingModule } from '@ibieats/messaging';

@Module({
  imports: [CqrsModule, DbModule, MessagingModule],
  controllers: [OrdersController],
  providers: [
    CreateOrderHandler,
    OrdersSaga,
    OrderRepository,
    EventPublisherService,
  ],
  exports: [OrderRepository], // Se outros módulos precisarem
})
export class OrdersModule {}
