import { AppEnvs } from '@/configs/AppEnvs.js';

import { COOKIE_NAMES, MS_EXPIRY } from '../auth.constant.js';
import { CookieConfig } from './cookie.util.js';

export function createCookieConfig() {
  const IS_PROD = !AppEnvs.IS_DEV;
  return Object.freeze({
    accessToken: new CookieConfig({
      name: COOKIE_NAMES.ACCESS,
      options: {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: IS_PROD ? 'strict' : 'lax',
        maxAge: MS_EXPIRY.ACCESS,
      },
    }),

    refreshToken: new CookieConfig({
      name: COOKIE_NAMES.REFRESH,
      options: {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: IS_PROD ? 'strict' : 'lax',
        maxAge: MS_EXPIRY.REFRESH,
      },
    }),

    csrfToken: new CookieConfig({
      name: COOKIE_NAMES.CSRF,
      options: {
        httpOnly: false,
        secure: IS_PROD,
        sameSite: IS_PROD ? 'strict' : 'lax',
        maxAge: MS_EXPIRY.CSRF,
      },
    }),

    deviceIdToken: new CookieConfig({
      name: COOKIE_NAMES.DEVICE_ID,
      options: {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: IS_PROD ? 'strict' : 'lax',
        maxAge: MS_EXPIRY.DEVICE_ID,
      },
    }),
  })
}
