import { CookieOptions, Response } from 'express';

import { ACC_COOKIE_Expiry, REF_COOKIE_Expiry } from '@/constants.js';
import { AppEnv } from '@/utils/AppEnv.js';

const { IS_DEV, ACC_COOKIE_NAME, REF_COOKIE_NAME } = AppEnv;

// ============================== Configs ==============================
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

const ACC_COOKIE_CONFIG = {
  name: ACC_COOKIE_NAME,
  options: ACC_COOKIE_OPTIONS,
};
const REF_COOKIE_CONFIG = {
  name: REF_COOKIE_NAME,
  options: REF_COOKIE_OPTIONS,
};

// ============================== Functions ==============================
export const setAccessCookie = (res: Response, token: string) => {
  const { name, options } = ACC_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const setRefreshCookie = (res: Response, token: string) => {
  const { name, options } = REF_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const clearAccessCookies = (res: Response) => {
  const { name, options } = ACC_COOKIE_CONFIG;
  res.clearCookie(name, options);
};

export const clearRefreshCookies = (res: Response) => {
  const { name, options } = REF_COOKIE_CONFIG;
  res.clearCookie(name, options);
};
