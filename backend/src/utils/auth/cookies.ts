import { CookieOptions, Response } from 'express';

import {
  ACC_COOKIE_NAME,
  ACCESS_EXPIRY_MS,
  REF_COOKIE_NAME,
  REFRESH_EXPIRY_MS,
} from '@/constants.js';
import { AppEnv } from '@/lib/AppEnv.js';

const IS_PROD = !AppEnv.IS_DEV;

// ============================== Configs ==============================
export const COMMON_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: IS_PROD ? 'strict' : 'lax',
};

const ACC_COOKIE_OPTIONS: CookieOptions = {
  ...COMMON_COOKIE_OPTIONS,
  maxAge: ACCESS_EXPIRY_MS,
};
const REF_COOKIE_OPTIONS: CookieOptions = {
  ...COMMON_COOKIE_OPTIONS,
  maxAge: REFRESH_EXPIRY_MS,
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
