import { SignOptions } from 'jsonwebtoken';
import ms from 'ms';

import { AppEnvs } from './shared/configs/AppEnvs.js';

const { IS_DEV } = AppEnvs;

// ==================== DB MODELS ====================
export const MODEL_NAMES = {
  user: 'User',
  message: 'Message',
  conversation: 'Conversation',
  userToken: 'UserToken',
  session: 'Session',
} as const;

export const USER_ROLES = ['USER', 'ADMIN', 'SUPER_ADMIN'] as const;
export const USER_ROLE_DEFAULT = USER_ROLES[0];
export type UserRolesType = (typeof USER_ROLES)[number];

export const MESSAGE_STATUS = ['sent', 'delivered', 'read'] as const;
export const MESSAGE_STATUS_DEFAULT = MESSAGE_STATUS[0];
export type MessageStatusType = (typeof MESSAGE_STATUS)[number];

// ==================== BCRYPT CONSTANTS ====================
export const SALT_ROUNDS = 10;

// ==================== COOKIE CONSTANTS ====================
export const COOKIE_NAMES = {
  access: 'chat-app-access-token',
  refresh: 'chat-app-refresh-token',
  csrf: 'chat-app-csrf-token',
  deviceId: 'chat-app-device-id',
  authState: 'chat-app-auth-state',
} as const;

// ==================== HEADER CONSTANTS ====================

export const HEADER_NAMES = {
  csrf: 'x-chat-app-csrf-token',
} as const;

// ==================== EXPIRY CONSTANTS ====================
type ExpiryKey = 'access' | 'refresh' | 'deviceId' | 'csrf' | 'authState';

type ExpiresIn = SignOptions['expiresIn'];
type RequiredExpiresIn = Exclude<ExpiresIn, undefined>;

const EXPIRY: Record<ExpiryKey, RequiredExpiresIn> = {
  access: IS_DEV ? '5m' : '15m',
  refresh: IS_DEV ? '15m' : '7d',
  deviceId: '30d',
  csrf: IS_DEV ? '5m' : '15m', // same as access
  authState: IS_DEV ? '15m' : '7d', // same as refresh
} as const;

export const MS_EXPIRY = Object.fromEntries(
  Object.entries(EXPIRY).map(([key, value]) => {
    if (!value) return [key, 0];
    return [key, typeof value === 'number' ? value : ms(value)];
  })
) as Record<ExpiryKey, number>;
