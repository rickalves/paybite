// domain/entities/order.ts
// Agregado raiz (Aggregate Root) do domínio de pedidos.
// Representa um pedido completo, controlando seu estado e regras de negócio.
// Emite eventos de domínio quando o estado muda, seguindo DDD + EDA.
// Responsável por transições de estado na SAGA (ex.: criar, reservar inventário, aprovar pagamento).

import { AggregateRoot } from '@nestjs/cqrs';
import { OrderId, UserId, Money } from '@shared/types';
import { OrderStatus } from '@shared/constants/order-status';
import { OrderItem } from '@domain/value-objects/order-item';
import { OrderCreatedEvent } from '@domain/events/order-created.event';
import { InventoryReservationRequestedEvent } from '@domain/events/inventory-reservation-requested.event';
import { PaymentRequestedEvent } from '@domain/events/payment-requested.event';
import { DeliveryRequestedEvent } from '@domain/events/delivery-requested.event';
import { OrderCompletedEvent } from '@domain/events/order-completed.event';
import { OrderCanceledEvent } from '@domain/events/order-canceled.event';

export class Order extends AggregateRoot {
  public readonly id: OrderId;
  public status: OrderStatus;
  public readonly userId: UserId;
  public readonly items: OrderItem[];
  public readonly total: Money;
  public readonly createdAt: Date;

  constructor(id: OrderId, userId: UserId, items: OrderItem[], total: Money) {
    super();
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.total = total;
    this.status = OrderStatus.CREATED;
    this.createdAt = new Date();
  }

  // Método para iniciar a criação do pedido (regra de negócio)
  create(): void {
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    this.apply(
      new OrderCreatedEvent(this.id, this.userId, this.items, this.total),
    );
  }

  // Transição: Solicitar reserva de inventário
  requestInventoryReservation(): void {
    if (this.status !== OrderStatus.CREATED) {
      throw new Error(
        'Can only request inventory reservation from CREATED status',
      );
    }
    this.status = OrderStatus.INVENTORY_RESERVED; // Temporário, será confirmado por evento
    this.apply(new InventoryReservationRequestedEvent(this.id, this.items));
  }

  // Transição: Solicitar pagamento
  requestPayment(): void {
    if (this.status !== OrderStatus.INVENTORY_RESERVED) {
      throw new Error('Can only request payment after inventory reservation');
    }
    this.status = OrderStatus.PAYMENT_REQUESTED;
    this.apply(new PaymentRequestedEvent(this.id, this.total));
  }

  // Transição: Solicitar entrega
  requestDelivery(): void {
    if (this.status !== OrderStatus.PAYMENT_APPROVED) {
      throw new Error('Can only request delivery after payment approval');
    }
    this.status = OrderStatus.DELIVERY_REQUESTED;
    this.apply(new DeliveryRequestedEvent(this.id));
  }

  // Finalizar pedido
  complete(): void {
    if (this.status !== OrderStatus.DELIVERY_STARTED) {
      throw new Error('Can only complete after delivery started');
    }
    this.status = OrderStatus.COMPLETED;
    this.apply(new OrderCompletedEvent(this.id));
  }

  // Cancelar pedido (compensação)
  cancel(): void {
    this.status = OrderStatus.CANCELED;
    this.apply(new OrderCanceledEvent(this.id));
  }

  // Método para aplicar eventos (CQRS)
  onOrderCreated(event: OrderCreatedEvent): void {
    // Lógica adicional se necessário
  }

  // Outros métodos onEvent para transições
}
