import { container } from '@/application/express/domain/app.container.js';

import { AuthCookieManager } from './auth.cookie.manager.js';
import { createAuthCookieRegistry } from './auth.cookie.registry.js';
import { AuthCookieService } from './auth.cookie.service.js';

const authCookieManager = () =>
  container.singleton(
    'AuthCookieManager',
    () => new AuthCookieManager(createAuthCookieRegistry())
  );

export const authCookieService = () =>
  container.singleton(
    'AuthCookieService',
    () => new AuthCookieService(authCookieManager())
  );
