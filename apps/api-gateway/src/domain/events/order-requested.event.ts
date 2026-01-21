// domain/events/order-requested.event.ts
// Evento de domínio: representa algo que aconteceu no domínio.
// Em EDA, este evento será publicado para o message broker (RabbitMQ).
// Permite comunicação assíncrona com outros serviços (ex.: Orders Service).

// Tipo para os itens do pedido no evento (tipagem forte em vez de any)
export type OrderItemEvent = {
  productId: string;
  quantity: number;
  price: number;
};

export class OrderRequestedEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly items: OrderItemEvent[], // Agora tipado!
    public readonly correlationId: string,
  ) {}
}
