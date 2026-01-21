// domain/entities/order-request.entity.ts
// Entidade principal do domínio: representa um pedido de entrada no API Gateway.
// Em DDD, entidades têm identidade e encapsulam regras de negócio.
// Aqui, validamos se o pedido tem itens e um usuário válido.

import { OrderRequestedEvent } from '../events/order-requested.event';
import { OrderItem } from '../value-objects/order-item.vo';

export class OrderRequest {
  constructor(
    public readonly id: string, // ID único do pedido (gerado no Gateway)
    public readonly userId: string, // ID do usuário autenticado
    public readonly items: OrderItem[], // Lista de itens (value objects)
    public readonly total: number, // Total calculado
    public readonly correlationId: string, // Para rastreabilidade em EDA
  ) {}

  // Regra de negócio: pedido deve ter pelo menos um item
  public validate(): boolean {
    return this.items.length > 0 && this.total > 0;
  }

  // Método para criar um evento de domínio
  public toOrderRequestedEvent(): OrderRequestedEvent {
    return new OrderRequestedEvent(
      this.id,
      this.userId,
      this.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      this.correlationId,
    );
  }
}
