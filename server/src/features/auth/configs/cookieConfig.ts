import { EnvVars } from '@/utils/EnvVarConfig.js';
import { CookieOptions } from 'express';
import { ACC_JWT_CONFIG, REF_JWT_CONFIG } from './jwtConfig.js';
import { jwtExpiryToCookieAge, MaxAge } from '../utils/jwtExpiryToCookieAge.js';

type CookieConfig = { name: string; options: CookieOptions };

const { IS_DEV, ACC_COOKIE_NAME, REF_COOKIE_NAME } = EnvVars;
const IS_PROD = !IS_DEV;

const createConfig = (
  name: string = '',
  options: CookieOptions
): CookieConfig => ({
  name,
  options,
});

const ACC_COOKIE_AGE: MaxAge = jwtExpiryToCookieAge(
  ACC_JWT_CONFIG.options.expiresIn
);
const REF_COOKIE_AGE: MaxAge = jwtExpiryToCookieAge(
  REF_JWT_CONFIG.options.expiresIn
);

const COMMON_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: (IS_PROD ? 'Strict' : 'Lax') as 'strict' | 'lax' | 'none',
};

const ACC_COOKIE_OPTIONS: CookieOptions = {
  ...COMMON_COOKIE_OPTIONS,
  // maxage: production 15mins, development 5mins
  maxAge: ACC_COOKIE_AGE,
};

const REF_COOKIE_OPTIONS: CookieOptions = {
  ...COMMON_COOKIE_OPTIONS,
  // maxage: production 7days, development 15mins
  maxAge: REF_COOKIE_AGE,
};

export const ACC_COOKIE_CONFIG = createConfig(
  ACC_COOKIE_NAME,
  ACC_COOKIE_OPTIONS
);
export const REF_COOKIE_CONFIG = createConfig(
  REF_COOKIE_NAME,
  REF_COOKIE_OPTIONS
);
