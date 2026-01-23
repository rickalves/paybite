import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  async create(data: Partial<OrderEntity>): Promise<OrderEntity> {
    const entity = this.repo.create(data as OrderEntity);
    return this.repo.save(entity);
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    return this.repo.save(order);
  }

  async findById(id: string): Promise<OrderEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.repo.find();
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
