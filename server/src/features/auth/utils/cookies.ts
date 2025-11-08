import { Response } from 'express';
import {
  ACC_COOKIE_CONFIG,
  REF_COOKIE_CONFIG,
} from '../configs/cookieConfig.js';

export const handleAccessCookie = (res: Response, token: string) => {
  const { name, options } = ACC_COOKIE_CONFIG;
  res.cookie(name, token, options);
};

export const handleRefreshCookie = (res: Response, token: string) => {
  const { name, options } = REF_COOKIE_CONFIG;
  res.cookie(name, token, options);
};
