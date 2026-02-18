import { container } from '@/application/express/domain/app.container.js';

import { AuthTokenManager } from './auth.token.manager.js';
import { createAuthTokenRegistry } from './auth.token.registry.js';
import { AuthTokenService } from './auth.token.service.js';

const authTokenManager = () =>
  container.singleton(
    'AuthTokenManager',
    () => new AuthTokenManager(createAuthTokenRegistry())
  );

export const authTokenService = () =>
  container.singleton(
    'AuthTokenService',
    () => new AuthTokenService(authTokenManager())
  );
