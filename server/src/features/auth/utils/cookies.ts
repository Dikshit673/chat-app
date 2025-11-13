import { Response } from 'express';
import {
  ACC_COOKIE_CONFIG,
  REF_COOKIE_CONFIG,
} from '../configs/cookieConfig.js';

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
