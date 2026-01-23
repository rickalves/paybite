import AppDataSource from './data-source';
import { OrderEntity } from './entities/order.entity';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized — running seed...');

    const repo = AppDataSource.getRepository(OrderEntity);

    const sampleOrders = [
      {
        userId: 'user-1',
        status: 'CREATED',
        items: [
          { itemId: 'item-1', name: 'Pizza Margherita', quantity: 2, unitPrice: { amount: 2500, currency: 'BRL' } },
        ],
        total: { amount: 5000, currency: 'BRL' },
      },
    ];

    for (const data of sampleOrders) {
      const saved = await repo.save(data as any);
      console.log('Inserted order id=', saved.id);
    }

    console.log('Seed finished');
    await AppDataSource.destroy();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    try {
      await AppDataSource.destroy();
    } catch {}
    process.exit(1);
  }
}

seed();
