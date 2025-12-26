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

// ==================== JWT CONSTANTS ====================
const ACC_EXPIRY: ExpiresIn = IS_DEV ? '5m' : '15m';
const REF_EXPIRY: ExpiresIn = IS_DEV ? '15m' : '7d';
export const ACCESS_EXPIRY_MS = ms(ACC_EXPIRY);
export const REFRESH_EXPIRY_MS = ms(REF_EXPIRY);

// ==================== COOKIE CONSTANTS ====================
export const DEVICE_ID_COOKIE_NAME = 'device_id';
export const ACC_COOKIE_NAME = 'CA_ACCESS_TOKEN';
export const REF_COOKIE_NAME = 'CA_REFRESH_TOKEN';
