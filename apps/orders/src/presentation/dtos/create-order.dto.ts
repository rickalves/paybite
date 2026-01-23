// presentation/dtos/create-order.dto.ts
// DTO para entrada da API (criar pedido).
// Valida dados de entrada usando class-validator.
// Transforma dados externos em objetos de domínio.

import { IsNotEmpty, IsArray, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from '@domain/value-objects/order-item';
import type { Money } from '@shared/types';
import { MoneyDto } from '@shared/types/money.dto';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsUUID()
  itemId: string;

  @IsNotEmpty()
  name: string;

  quantity: number;

  @ValidateNested()
  @Type(() => MoneyDto)
  unitPrice: Money;
}
