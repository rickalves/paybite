// domain/events/payment-requested.event.ts
// Evento para solicitar processamento de pagamento ao payments service.

import { OrderId, Money } from '@shared/types';

export class PaymentRequestedEvent {
  constructor(
    public readonly orderId: OrderId,
    public readonly amount: Money,
  ) {}

  toJSON() {
    return {
      eventType: 'payment.requested',
      orderId: this.orderId,
      amount: this.amount,
    };
  }
}
