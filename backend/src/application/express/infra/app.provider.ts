import { IS_PROD } from '@/configs/env/index.js';
import { Logger } from '@/services/index.js';

import { App } from '../core/express.app.js';
import { container } from '../domain/app.container.js';
import { rootRouter } from '../routers/index.js';

export const appInstance = () =>
  container.singleton(
    'App',
    () =>
      new App({
        routers: rootRouter(),
        logger: new Logger('APP', IS_PROD ? 'info' : 'debug'),
      })
  );
