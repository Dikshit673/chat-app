import { SignOptions } from 'jsonwebtoken';
import ms from 'ms';

import { AppEnv } from './lib/AppEnv.js';

type ExpiresIn = SignOptions['expiresIn'];

const { IS_DEV } = AppEnv;

// ==================== DB MODELS ====================
export const USER_MODEL_NAME = 'user';
export const USER_TOKEN_MODEL_NAME = 'userToken';
export const MESSAGE_MODEL_NAME = 'message';

export const USER_ROLES = ['USER', 'ADMIN', 'SUPER_ADMIN'] as const;
export type UserRolesType = (typeof USER_ROLES)[number];

// ==================== BCRYPT CONSTANTS ====================
export const SALT_ROUNDS = 10;

// ==================== COOKIE CONSTANTS ====================
const prefix = 'chat_app_';
export const ACC_COOKIE_NAME = prefix + 'access_token';
export const REF_COOKIE_NAME = prefix + 'refresh_token';
export const DEVICE_ID_COOKIE_NAME = prefix + 'device_id';
export const AUTH_STATE_COOKIE_NAME = prefix + 'auth_state';

export const CSRF_COOKIE_NAME = prefix + 'csrf_token';
export const CSRF_HEADER_NAME = 'x-chat-app-csrf-token';

const ACC_EXPIRY: ExpiresIn = IS_DEV ? '5m' : '15m';
const REF_EXPIRY: ExpiresIn = IS_DEV ? '15m' : '7d';
const DEVICE_ID_EXPIRY: ExpiresIn = '30d';
const CSRF_EXPIRY: ExpiresIn = ACC_EXPIRY;
const AUTH_STATE_EXPIRY: ExpiresIn = REF_EXPIRY;

export const ACCESS_EXPIRY_MS = ms(ACC_EXPIRY);
export const REFRESH_EXPIRY_MS = ms(REF_EXPIRY);
export const DEVICE_ID_EXPIRY_MS = ms(DEVICE_ID_EXPIRY);
export const CSRF_EXPIRY_MS = ms(CSRF_EXPIRY);
export const AUTH_STATE_EXPIRY_MS = ms(AUTH_STATE_EXPIRY);
