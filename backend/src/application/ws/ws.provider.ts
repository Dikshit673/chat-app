import { IS_PROD } from '@/configs/env/index.js';
import { Logger } from '@/services/index.js';

import { container } from '../express/domain/app.container.js';
import type { HttpServer } from '../http/http.server.js';
import { WsContext } from './ws.context.js';
import { WsRouter } from './ws.router.js';
import { WsServer } from './ws.server.js';

export const wsServerFn = (httpServer: HttpServer) =>
  container.singleton(
    'WsServer',
    () =>
      new WsServer(httpServer.getServer(), {
        router: new WsRouter([]),
        context: new WsContext(),
        logger: new Logger('WS', IS_PROD ? 'info' : 'debug'),
      })
  );
