// application/commands/create-order.command.ts
// Comando CQRS para criar um novo pedido.
// Representa uma intenção do usuário (via presentation layer).
// Será processado por um CommandHandler no application layer.

import { OrderId, UserId } from '@shared/types';
import { OrderItem } from '@domain/value-objects/order-item';

export class CreateOrderCommand {
  constructor(
    public readonly orderId: OrderId,
    public readonly userId: UserId,
    public readonly items: OrderItem[],
  ) {}
}
