import { CookieOptions, Response } from 'express';

import { COOKIE_NAMES, MS_EXPIRY } from '@/constants.js';
import { AppEnvs } from '@/lib/AppEnvs.js';

const IS_PROD = !AppEnvs.IS_DEV;

// =========================== COMMON COOKIE OPTIONS ========================
const COMMON_OPTIONS = {
  secure: IS_PROD,
  sameSite: IS_PROD ? 'strict' : 'lax',
} as CookieOptions;

const createOptions = (options: CookieOptions): CookieOptions => options;

// ============================== ACCESS COOKIE ==============================
const ACCESS_OPTIONS = createOptions({
  httpOnly: true,
  ...COMMON_OPTIONS,
  maxAge: MS_EXPIRY.access,
});

export const setAccessCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAMES.access, token, ACCESS_OPTIONS);
};

export const clearAccessCookies = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.access, ACCESS_OPTIONS);
};

// ============================== REFRESH COOKIE ==============================
const REFRESH_OPTIONS = createOptions({
  httpOnly: true,
  ...COMMON_OPTIONS,
  maxAge: MS_EXPIRY.refresh,
});

export const setRefreshCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAMES.refresh, token, REFRESH_OPTIONS);
};

export const clearRefreshCookies = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.refresh, REFRESH_OPTIONS);
};

// ============================== DEVICE ID COOKIE ==============================
const DEVICE_ID_OPTIONS = createOptions({
  httpOnly: true,
  ...COMMON_OPTIONS,
  maxAge: MS_EXPIRY.deviceId,
});

export const setDeviceIdCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAMES.deviceId, token, DEVICE_ID_OPTIONS);
};

export const clearDeviceIdCookies = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.deviceId, DEVICE_ID_OPTIONS);
};

// ============================== CSRF COOKIE ==============================
const CSRF_OPTIONS = createOptions({
  httpOnly: false,
  ...COMMON_OPTIONS,
  maxAge: MS_EXPIRY.csrf,
});

export const setCsrfCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAMES.csrf, token, CSRF_OPTIONS);
};

export const clearCsrfCookies = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.csrf, CSRF_OPTIONS);
};

// ============================== AUTH STATE COOKIE ==============================
const AUTH_STATE_OPTIONS = createOptions({
  httpOnly: false,
  ...COMMON_OPTIONS,
  maxAge: MS_EXPIRY.authState,
});

export const setAuthStateCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAMES.authState, token, AUTH_STATE_OPTIONS);
};

export const clearAuthStateCookies = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.authState, AUTH_STATE_OPTIONS);
};
