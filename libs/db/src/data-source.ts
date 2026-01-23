import { DataSource } from 'typeorm';
import { OrderEntity } from './entities/order.entity';

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/ibieats',
  entities: [OrderEntity],
  migrations: [isProd ? 'dist/libs/db/migrations/*.js' : 'src/migrations/*.ts'],
});

export default AppDataSource;
