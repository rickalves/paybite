// application/handlers/create-order.handler.ts
// Command Handler para processar CreateOrderCommand.
// Coordena a lógica de aplicação: cria o agregado Order, salva no repositório e emite eventos.
// Usa CQRS para separar comando de query.

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '@application/commands/create-order.command';
import { Order } from '@domain/entities/order';
import { OrderRepository } from '@infrastructure/repositories/order.repository';
import { Money } from '@shared/types';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    // Calcular total (lógica simples; em produção, poderia ser mais complexa)
    const total: Money = command.items.reduce(
      (acc, item) => ({
        amount: acc.amount + item.subtotal.amount,
        currency: acc.currency || item.unitPrice.currency,
      }),
      { amount: 0, currency: 'BRL' },
    );

    // Criar agregado
    const order = new Order(
      command.orderId,
      command.userId,
      command.items,
      total,
    );

    // Aplicar regras de negócio (emite eventos)
    order.create();

    // Salvar no repositório
    await this.orderRepository.save(order);

    // Publicar eventos via CQRS
    order.commit(); // Confirma eventos pendentes
  }
}
