import ms from 'ms';

import { AppEnvs } from '@/configs/AppEnvs.js';

const { IS_DEV } = AppEnvs;

// ==================== COOKIE CONSTANTS ====================

export const COOKIE_NAMES = {
  ACCESS: 'chat-app-access-token',
  REFRESH: 'chat-app-refresh-token',
  CSRF: 'chat-app-csrf-token',
  DEVICE_ID: 'chat-app-device-id',
  AUTH_STATE: 'chat-app-auth-state',
} as const;

export type CookieName = (typeof COOKIE_NAMES)[keyof typeof COOKIE_NAMES];

// ==================== HEADER CONSTANTS ====================

export const HEADER_NAMES = {
  CSRF: 'x-chat-app-csrf-token',
} as const;

// ==================== EXPIRY CONSTANTS ====================

export const EXPIRY = {
  ACCESS: IS_DEV ? '5m' : '15m',
  REFRESH: IS_DEV ? '15m' : '7d',
  DEVICE_ID: '30d',
  CSRF: IS_DEV ? '5m' : '15m', // same as access
  AUTH_STATE: IS_DEV ? '15m' : '7d', // same as refresh
} as const;

type ExpiryKey = keyof typeof EXPIRY;

export const MS_EXPIRY = Object.fromEntries(
  Object.entries(EXPIRY).map(([key, value]) => {
    if (!value) return [key, 0];
    return [key, typeof value === 'number' ? value : ms(value)];
  })
) as Record<ExpiryKey, number>;
