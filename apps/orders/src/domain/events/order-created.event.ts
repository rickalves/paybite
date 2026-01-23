// domain/events/order-created.event.ts
// Evento de domínio emitido quando um pedido é criado.
// Segue o padrão de Event Sourcing/EDA: representa um fato ocorrido no domínio.
// Será publicado via mensageria para notificar outros serviços (ex.: inventory para reserva).

import { OrderId, UserId, Money } from '@shared/types';
import { OrderItem } from '@domain/value-objects/order-item';

export class OrderCreatedEvent {
  constructor(
    public readonly orderId: OrderId,
    public readonly userId: UserId,
    public readonly items: OrderItem[],
    public readonly total: Money,
  ) {}

  // Método opcional para serialização (útil para mensageria)
  toJSON() {
    return {
      eventType: 'order.created',
      orderId: this.orderId,
      userId: this.userId,
      items: this.items.map((item) => ({
        itemId: item.itemId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      total: this.total,
    };
  }
}
