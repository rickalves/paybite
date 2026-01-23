// domain/events/order-canceled.event.ts
// Evento de compensação (falha na SAGA).

import { OrderId } from '@shared/types';

export class OrderCanceledEvent {
  constructor(public readonly orderId: OrderId) {}

  toJSON() {
    return {
      eventType: 'order.canceled',
      orderId: this.orderId,
    };
  }
}
