// domain/events/inventory-reservation-requested.event.ts
// Evento emitido quando o orders service solicita reserva de inventário ao inventory service.
// Parte da SAGA: após criação do pedido, avança para reserva.

import { OrderId } from '@shared/types';
import { OrderItem } from '@domain/value-objects/order-item';

export class InventoryReservationRequestedEvent {
  constructor(
    public readonly orderId: OrderId,
    public readonly items: OrderItem[],
  ) {}

  toJSON() {
    return {
      eventType: 'inventory.reservation.requested',
      orderId: this.orderId,
      items: this.items.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
    };
  }
}
