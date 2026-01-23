// domain/events/delivery-requested.event.ts
// Evento para iniciar entrega via delivery service.

import { OrderId } from '@shared/types';

export class DeliveryRequestedEvent {
  constructor(public readonly orderId: OrderId) {}

  toJSON() {
    return {
      eventType: 'delivery.requested',
      orderId: this.orderId,
    };
  }
}
