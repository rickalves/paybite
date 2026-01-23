import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column({ default: 'CREATED' })
  status!: string;

  @Column({ type: 'json', nullable: true })
  items?: any;

  @Column({ type: 'json', nullable: true })
  total?: any;

  @CreateDateColumn()
  createdAt!: Date;
}
