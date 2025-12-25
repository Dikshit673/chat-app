import { SignOptions } from 'jsonwebtoken';
import ms from 'ms';

import { AppEnv } from './lib/AppEnv.js';

type ExpiresIn = SignOptions['expiresIn'];

const { IS_DEV } = AppEnv;
// ==================== DB MODELS ====================
export const USER_MODEL_NAME = 'user';
export const USER_TOKEN_MODEL_NAME = 'userToken';
export const MESSAGE_MODEL_NAME = 'message';

// ==================== BCRYPT CONSTANTS ====================
export const SALT_ROUNDS = 10;

// ==================== JWT CONSTANTS ====================
export const ACC_JWT_EXPIRY: ExpiresIn = IS_DEV ? '5m' : '15m';
export const REF_JWT_EXPIRY: ExpiresIn = IS_DEV ? '15m' : '7d';

// ==================== COOKIE CONSTANTS ====================
export const ACC_COOKIE_Expiry = ms(ACC_JWT_EXPIRY);
export const REF_COOKIE_Expiry = ms(REF_JWT_EXPIRY);
