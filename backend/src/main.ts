import { bootstrap } from './bootstrap.js';
import { Logger } from './services/index.js';

async function execute(logger: Logger) {
  const { httpServer, wsServer } = await bootstrap();

  httpServer.start();

  const shutdown = async (signal: string) => {
    logger.warn(`⚠️ Received ${signal}`);
    await wsServer.shutdown();
    await httpServer.shutdown();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.on('uncaughtException', async (err) => {
    logger.error('💥 Uncaught exception', err);
    await shutdown('uncaughtException');
  });
  process.on('unhandledRejection', async (err) => {
    logger.error(`💥 Unhandled rejection ${err}`);
    await shutdown('unhandledRejection');
  });
}

async function main() {
  const logger = new Logger('MAIN', 'info');
  try {
    await execute(logger);
  } catch (error) {
    logger.error(`❌ Failed to start app ${error}`);
    process.exit(1);
  }
}

main();
