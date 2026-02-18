import ms from 'ms';

// ==================== HEADER CONSTANTS ====================

export const HEADER_NAMES = Object.freeze({
  CSRF: 'x-chat-app-csrf-token',
});

// ==================== EXPIRY CONSTANTS ====================

export const EXPIRY = Object.freeze({
  DEV: {
    ACCESS: ms('5m'),
    REFRESH: ms('15m'),
    DEVICE_ID: ms('30d'),
    CSRF: ms('5m'),
    AUTH_STATE: ms('15m'),
  },
  PROD: {
    ACCESS: ms('15m'),
    REFRESH: ms('7d'),
    DEVICE_ID: ms('30d'),
    CSRF: ms('15m'),
    AUTH_STATE: ms('7d'),
  },
});
