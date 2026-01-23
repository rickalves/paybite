// shared/constants/order-status.ts
// Define os possíveis estados de um pedido no domínio.
// Esses estados são usados pelo agregado Order para controlar transições e garantir consistência.
// Seguem o fluxo da SAGA: CREATED -> INVENTORY_RESERVED -> PAYMENT_REQUESTED -> etc.
// Em caso de falha, estados como CANCELED ou FAILED indicam compensações.

export enum OrderStatus {
  CREATED = 'CREATED', // Pedido recém-criado, aguardando reserva de inventário
  INVENTORY_RESERVED = 'INVENTORY_RESERVED', // Inventário reservado com sucesso
  PAYMENT_REQUESTED = 'PAYMENT_REQUESTED', // Pagamento solicitado
  PAYMENT_APPROVED = 'PAYMENT_APPROVED', // Pagamento aprovado
  DELIVERY_REQUESTED = 'DELIVERY_REQUESTED', // Entrega solicitada
  DELIVERY_STARTED = 'DELIVERY_STARTED', // Entrega iniciada
  COMPLETED = 'COMPLETED', // Pedido concluído com sucesso
  CANCELED = 'CANCELED', // Pedido cancelado (compensação)
  FAILED = 'FAILED', // Falha geral (ex.: inventário insuficiente)
}
