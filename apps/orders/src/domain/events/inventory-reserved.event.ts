// domain/events/inventory-reserved.event.ts
// Evento emitido pelo inventory service quando reserva é bem-sucedida.

import { OrderId } from '@shared/types';

export class InventoryReservedEvent {
  constructor(public readonly orderId: OrderId) {}

  toJSON() {
    return {
      eventType: 'inventory.reserved',
      orderId: this.orderId,
    };
  }
}
