import { buildAppServices } from './infra/app/app.container.js';
import { buildAppMiddleware } from './infra/app/app.middleware.js';
import { buildAppRouter } from './infra/app/app.router.js';
import App from './infra/app/express.app.js';
import { HttpServer } from './infra/http/http.server.js';
import { WsContext } from './infra/ws/ws.context.js';
import { WsRouter } from './infra/ws/ws.router.js';
import { WsServer } from './infra/ws/ws.server.js';
import { LoggerService } from './services/logger.js';
import { AppEnvs } from './configs/AppEnvs.js';

// main
function main() {
  // build services
  const services = buildAppServices();

  // build routers and middlewares
  const appRouters = buildAppRouter(services);
  const appMiddlewares = buildAppMiddleware(services);

  // build app
  const express = new App({
    port: AppEnvs.PORT,
    environment: AppEnvs.NODE_ENV,
    corsOrigin: AppEnvs.FRONTEND_URL,
    routers: appRouters,
    middlewares: appMiddlewares,
  });

  // create http server
  const server = new HttpServer(express.app, { port: 3000 });

  // create ws server
  const wsServer = new WsServer(
    server.getHttpServer(),
    new WsRouter([]),
    new WsContext(),
    new LoggerService()
  );

  // start servers
  server.start();

  // shutdown
  process.on('SIGINT', async () => {
    await wsServer.shutdown();
    await server.shutdown();
    process.exit(0);
  });
}

// run
main();
