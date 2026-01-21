// domain/services/order-validation.service.ts
// Serviço de domínio: contém lógica de negócio que não pertence a uma entidade específica.
// Aqui, validamos regras globais do pedido (ex.: limite de itens).

import { OrderRequest } from '../entities/order-request.entity';

export class OrderValidationService {
  public static validateOrder(order: OrderRequest): void {
    if (order.items.length > 10) {
      throw new Error('Order cannot have more than 10 items');
    }
    // Outras validações de negócio...
  }
}
