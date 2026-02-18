// ==================== COOKIE CONSTANTS ====================
export const AUTH_COOKIES = Object.freeze({
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
  CSRF: 'csrf_token',
});

export type CookieKeys = keyof typeof AUTH_COOKIES;

export type CookieValues = (typeof AUTH_COOKIES)[CookieKeys];
