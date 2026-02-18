import type { App } from '@/application/express/core/express.app.js';
import { container } from '@/application/express/domain/app.container.js';
import { ENV, IS_PROD } from '@/configs/env/index.js';
import { Logger } from '@/services/index.js';

import { HttpServer } from './http.server.js';

export const httpServerFn = (app: App) =>
  container.singleton(
    'HttpServer',
    () =>
      new HttpServer(app.getApp(), {
        port: ENV.PORT,
        logger: new Logger('HTTP', IS_PROD ? 'info' : 'debug'),
      })
  );
