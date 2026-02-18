import { IS_PROD } from '@/configs/env/index.js';
import { EXPIRY } from '@/features/auth/domain/auth.constant.js';
import { Cookie } from '@/features/shared/cookie/index.js';

import { AUTH_COOKIES, type CookieKeys } from './auth.cookie.constants.js';

export type CookieRegistry = Record<CookieKeys, Cookie>;

export function createAuthCookieRegistry(): CookieRegistry {
  const MS_EXPIRY = EXPIRY[IS_PROD ? 'PROD' : 'DEV'];

  const baseOptions = {
    secure: IS_PROD,
    sameSite: IS_PROD ? 'strict' : 'lax',
  } as const;

  return {
    ACCESS: new Cookie(AUTH_COOKIES.ACCESS, {
      ...baseOptions,
      httpOnly: true,
      maxAge: MS_EXPIRY.ACCESS,
    }),

    REFRESH: new Cookie(AUTH_COOKIES.REFRESH, {
      ...baseOptions,
      httpOnly: true,
      maxAge: MS_EXPIRY.REFRESH,
    }),

    CSRF: new Cookie(AUTH_COOKIES.CSRF, {
      ...baseOptions,
      httpOnly: false,
      maxAge: MS_EXPIRY.CSRF,
    }),
  };
}
