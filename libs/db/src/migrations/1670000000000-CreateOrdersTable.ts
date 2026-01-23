import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersTable1670000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'userId', type: 'varchar' },
          { name: 'status', type: 'varchar', default: "'CREATED'" },
          { name: 'items', type: 'json', isNullable: true },
          { name: 'total', type: 'json', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
