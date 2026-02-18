import { mongoDB } from '@/application/db/mongo/infra/mongodb.provider.js';
import { appInstance } from '@/application/express/infra/app.provider.js';
import { httpServerFn } from '@/application/http/http.provider.js';
import { wsServerFn } from '@/application/ws/ws.provider.js';

import { ENV } from './configs/env/index.js';

// bootstrap.ts
export async function bootstrap() {
  //* DB
  await mongoDB.connect(); // 👈 IMPORTANT

  //* App
  const app = appInstance();

  // const expApp = app.getApp();

  // expApp.route('/health', (req, res) =>
  //   res.sendStatus(200).json({ result: 'OK', data: expApp })
  // );

  //* HTTP
  const httpServer = httpServerFn(app);

  //* WS
  const wsServer = wsServerFn(httpServer);

  return {
    env: ENV,
    mongoDB,
    httpServer,
    wsServer,
  };
}
