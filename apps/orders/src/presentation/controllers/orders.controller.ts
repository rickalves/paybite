// presentation/controllers/orders.controller.ts
// Controlador REST para endpoints de pedidos.
// Recebe requisições HTTP, valida DTOs e despacha comandos CQRS.
// Não contém lógica de negócio; apenas orquestra entrada/saída.

import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '@application/commands/create-order.command';
import { CreateOrderDto } from '@presentation/dtos/create-order.dto';
import { OrderItem } from '@domain/value-objects/order-item';
import { v4 as uuidv4 } from 'uuid'; // Adicionar uuid ao package.json se necessário

@Controller('orders')
export class OrdersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createOrder(@Body(ValidationPipe) dto: CreateOrderDto) {
    const orderId = uuidv4();
    const command = new CreateOrderCommand(
      orderId,
      dto.userId,
      dto.items.map(
        (item) =>
          new OrderItem(item.itemId, item.name, item.quantity, item.unitPrice),
      ),
    );
    await this.commandBus.execute(command);
    return { orderId };
  }
}
