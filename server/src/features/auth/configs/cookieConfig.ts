import { CookieOptions } from 'express';
import { jwtExpiryToCookieExpiry } from '../utils/jwtExpiryToCookieExpiry.js';
import { EnvVars } from '@/utils/EnvVarConfig.js';
import { ACC_JWT_EXPIRY, REF_JWT_EXPIRY } from './jwtConfig.js';

type MaxAge = CookieOptions['maxAge'];

const { IS_DEV, ACC_COOKIE_NAME, REF_COOKIE_NAME } = EnvVars;

export const ACC_COOKIE_Expiry: MaxAge =
  jwtExpiryToCookieExpiry(ACC_JWT_EXPIRY);
export const REF_COOKIE_Expiry: MaxAge =
  jwtExpiryToCookieExpiry(REF_JWT_EXPIRY);

const COMMON_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: !IS_DEV,
  sameSite: (!IS_DEV ? 'Strict' : 'Lax') as 'strict' | 'lax' | 'none',
};

const ACC_COOKIE_OPTIONS: CookieOptions = {
  ...COMMON_COOKIE_OPTIONS,
  maxAge: ACC_COOKIE_Expiry,
};
const REF_COOKIE_OPTIONS: CookieOptions = {
  ...COMMON_COOKIE_OPTIONS,
  maxAge: REF_COOKIE_Expiry,
};

export const ACC_COOKIE_CONFIG = {
  name: ACC_COOKIE_NAME,
  options: ACC_COOKIE_OPTIONS,
};
export const REF_COOKIE_CONFIG = {
  name: REF_COOKIE_NAME,
  options: REF_COOKIE_OPTIONS,
};
