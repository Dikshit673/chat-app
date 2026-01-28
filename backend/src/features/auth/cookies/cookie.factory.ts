import { createCookieConfig } from './cookie.config.js';
import { Cookie } from './cookie.util.js';

export function createCookies() {
  const configs = createCookieConfig();
  return Object.freeze({
    accessToken: new Cookie(configs.accessToken),
    refreshToken: new Cookie(configs.refreshToken),
    csrfToken: new Cookie(configs.csrfToken),
    deviceIdToken: new Cookie(configs.deviceIdToken),
  });
}

export type Cookies = ReturnType<typeof createCookies>;
