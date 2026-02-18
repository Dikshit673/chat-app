import { Header } from '@/features/shared/header/index.js';

import { AUTH_HEADER, type AuthHeaderKey } from './auth.header.constants.js';

export type AuthHeaderRegistry = Record<AuthHeaderKey, Header>;

export function createAuthHeaderRegistry(): AuthHeaderRegistry {
  return {
    ACCESS: new Header(AUTH_HEADER.ACCESS),
    CSRF: new Header(AUTH_HEADER.CSRF),
  };
}
