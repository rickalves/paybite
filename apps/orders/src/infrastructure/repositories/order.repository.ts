// infrastructure/repositories/order.repository.ts
// Interface e implementação do repositório para Order.
// Segue Repository Pattern: abstrai acesso a dados (DB).
// A interface fica no domain (não mostrada aqui), implementação na infrastructure.

import { Injectable } from '@nestjs/common';
import { OrderId, Money } from '@shared/types';
import { OrderItem } from '@domain/value-objects/order-item';
import { Order as DomainOrder } from '@domain/entities/order';
import { OrderRepository as DbOrderRepository, OrderEntity } from '@ibieats/db';

// Interface (deve estar em domain/repositories/order.repository.interface.ts)
export interface IOrderRepository {
  save(order: DomainOrder): Promise<void>;
  findById(id: OrderId): Promise<DomainOrder | null>;
  update(order: DomainOrder): Promise<void>;
}

// Implementação usando a lib @ibieats/db (assumindo TypeORM ou similar)
@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly db: DbOrderRepository) {}

  private toEntity(order: DomainOrder): Partial<OrderEntity> {
    return {
      id: order.id,
      userId: order.userId,
      status: (order as any).status,
      createdAt: order.createdAt,
      items: order.items.map((i) => ({
        itemId: i.itemId,
        name: i.name,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
      total: order.total,
    };
  }

  private toDomain(entity: OrderEntity): DomainOrder {
    const items = (entity.items || []).map(
      (i: any) =>
        new OrderItem(
          i.itemId,
          i.name,
          i.quantity,
          i.unitPrice || { amount: 0, currency: 'BRL' },
        ),
    );
    const total: Money = entity.total || {
      amount: items.reduce(
        (s: number, it: OrderItem) => s + it.subtotal.amount,
        0,
      ),
      currency: 'BRL',
    };
    const order = new DomainOrder(entity.id, entity.userId, items, total);
    return order;
  }

  async save(order: DomainOrder): Promise<void> {
    const entity = this.toEntity(order);
    await this.db.create(entity);
  }

  async findById(id: OrderId): Promise<DomainOrder | null> {
    const entity = await this.db.findById(id);
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async update(order: DomainOrder): Promise<void> {
    const entity = this.toEntity(order);
    await this.db.save(entity as OrderEntity);
  }
}
