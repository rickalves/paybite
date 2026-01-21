// application/commands/create-order.command.ts
// Comando: representa uma intenção do usuário (ação que muda estado).
// Em CQRS, commands são imutáveis e contêm dados necessários para executar a ação.

export class CreateOrderCommand {
  constructor(
    public readonly userId: string,
    public readonly items: {
      productId: string;
      quantity: number;
      price: number;
    }[],
    public readonly correlationId: string,
  ) {}
}
