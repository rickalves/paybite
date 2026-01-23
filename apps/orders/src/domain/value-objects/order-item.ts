// domain/value-objects/order-item.ts
// Value Object que representa um item dentro de um pedido.
// Value Objects são imutáveis e identificados por seus valores (não por ID).
// Responsável por encapsular lógica relacionada a itens, como cálculo de subtotal.

import { ItemId } from '@shared/types';
import { Money } from '@shared/types';

export class OrderItem {
  constructor(
    public readonly itemId: ItemId, // ID do item (ex.: produto)
    public readonly name: string, // Nome do item
    public readonly quantity: number, // Quantidade solicitada
    public readonly unitPrice: Money, // Preço unitário
  ) {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
  }

  // Calcula o subtotal para este item (quantidade * preço unitário)
  get subtotal(): Money {
    return {
      amount: this.quantity * this.unitPrice.amount,
      currency: this.unitPrice.currency,
    };
  }

  // Método para alterar quantidade (retorna novo VO, pois é imutável)
  withQuantity(newQuantity: number): OrderItem {
    return new OrderItem(this.itemId, this.name, newQuantity, this.unitPrice);
  }
}
