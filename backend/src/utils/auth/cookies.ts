import { CookieOptions, Response } from 'express';

import {
  ACC_COOKIE_NAME,
  ACCESS_EXPIRY_MS,
  AUTH_STATE_COOKIE_NAME,
  AUTH_STATE_EXPIRY_MS,
  CSRF_COOKIE_NAME,
  CSRF_EXPIRY_MS,
  DEVICE_ID_COOKIE_NAME,
  DEVICE_ID_EXPIRY_MS,
  REF_COOKIE_NAME,
  REFRESH_EXPIRY_MS,
} from '@/constants.js';
import { AppEnv } from '@/lib/AppEnv.js';

const IS_PROD = !AppEnv.IS_DEV;

// =========================== COMMON COOKIE OPTIONS ========================
const COMMON_COOKIE_OPTIONS: CookieOptions = {
  secure: IS_PROD,
  sameSite: IS_PROD ? 'strict' : 'lax',
};

// ============================== ACCESS COOKIE ==============================
const ACC_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  ...COMMON_COOKIE_OPTIONS,
  maxAge: ACCESS_EXPIRY_MS,
};

const ACC_COOKIE_CONFIG = {
  name: ACC_COOKIE_NAME,
  options: ACC_COOKIE_OPTIONS,
};

export const setAccessCookie = (res: Response, token: string) => {
  const { name, options } = ACC_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const clearAccessCookies = (res: Response) => {
  const { name, options } = ACC_COOKIE_CONFIG;
  res.clearCookie(name, options);
};

// ============================== REFRESH COOKIE ==============================
const REF_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  ...COMMON_COOKIE_OPTIONS,
  maxAge: REFRESH_EXPIRY_MS,
};

const REF_COOKIE_CONFIG = {
  name: REF_COOKIE_NAME,
  options: REF_COOKIE_OPTIONS,
};

export const setRefreshCookie = (res: Response, token: string) => {
  const { name, options } = REF_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const clearRefreshCookies = (res: Response) => {
  const { name, options } = REF_COOKIE_CONFIG;
  res.clearCookie(name, options);
};

// ============================== DEVICE ID COOKIE ==============================
const DEVICE_ID_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  ...COMMON_COOKIE_OPTIONS,
  maxAge: DEVICE_ID_EXPIRY_MS,
};

const DEVICE_ID_COOKIE_CONFIG = {
  name: DEVICE_ID_COOKIE_NAME,
  options: DEVICE_ID_COOKIE_OPTIONS,
};

export const setDeviceIdCookie = (res: Response, token: string) => {
  const { name, options } = DEVICE_ID_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const clearDeviceIdCookies = (res: Response) => {
  const { name, options } = DEVICE_ID_COOKIE_CONFIG;
  res.clearCookie(name, options);
};

// ============================== CSRF COOKIE ==============================
const CSRF_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: false,
  ...COMMON_COOKIE_OPTIONS,
  maxAge: CSRF_EXPIRY_MS,
};

const CSRF_COOKIE_CONFIG = {
  name: CSRF_COOKIE_NAME,
  options: CSRF_COOKIE_OPTIONS,
};

export const setCsrfCookie = (res: Response, token: string) => {
  const { name, options } = CSRF_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const clearCsrfCookies = (res: Response) => {
  const { name, options } = CSRF_COOKIE_CONFIG;
  res.clearCookie(name, options);
};

// ============================== AUTH STATE COOKIE ==============================
const AUTH_STATE_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: false,
  ...COMMON_COOKIE_OPTIONS,
  maxAge: AUTH_STATE_EXPIRY_MS,
};

const AUTH_STATE_COOKIE_CONFIG = {
  name: AUTH_STATE_COOKIE_NAME,
  options: AUTH_STATE_COOKIE_OPTIONS,
};

export const setAuthStateCookie = (res: Response, token: string) => {
  const { name, options } = AUTH_STATE_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const clearAuthStateCookies = (res: Response) => {
  const { name, options } = AUTH_STATE_COOKIE_CONFIG;
  res.clearCookie(name, options);
};
