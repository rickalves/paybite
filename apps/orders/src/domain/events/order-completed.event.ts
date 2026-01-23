// domain/events/order-completed.event.ts
// Evento final de sucesso da SAGA.

import { OrderId } from '@shared/types';

export class OrderCompletedEvent {
  constructor(public readonly orderId: OrderId) {}

  toJSON() {
    return {
      eventType: 'order.completed',
      orderId: this.orderId,
    };
  }
}
