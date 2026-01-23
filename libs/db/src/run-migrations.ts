import AppDataSource from './data-source';

async function run() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized — running migrations...');
    await AppDataSource.runMigrations();
    console.log('Migrations finished');
    await AppDataSource.destroy();
    process.exit(0);
  } catch (err) {
    console.error('Migration run failed', err);
    process.exit(1);
  }
}

run();
