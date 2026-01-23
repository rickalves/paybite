// application/commands/request-inventory-reservation.command.ts
// Comando para solicitar reserva de inventário.

import { OrderId } from '@shared/types';
import { OrderItem } from '@domain/value-objects/order-item';

export class RequestInventoryReservationCommand {
  constructor(
    public readonly orderId: OrderId,
    public readonly items: OrderItem[],
  ) {}
}
