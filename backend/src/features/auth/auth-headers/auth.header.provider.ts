import { container } from '@/application/express/domain/app.container.js';

import { AuthHeaderManager } from './auth.header.manager.js';
import { createAuthHeaderRegistry } from './auth.header.registry.js';
import { AuthHeaderService } from './auth.header.service.js';

export const authHeaderManager = () =>
  container.singleton(
    'HeaderService',
    () => new AuthHeaderManager(createAuthHeaderRegistry())
  );

export const authHeaderService = () =>
  container.singleton(
    'AuthHeaderService',
    () => new AuthHeaderService(authHeaderManager())
  );

// export const sessionHeaderManager = () =>
//   container.singleton(
//     'SessionHeaderManager',
//     () => new SessionHeaderManager(headerService())
//   );
