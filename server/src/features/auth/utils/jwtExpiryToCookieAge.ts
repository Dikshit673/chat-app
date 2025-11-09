import { CookieOptions } from 'express';
import { SignOptions } from 'jsonwebtoken';
import ms from 'ms';

export type ExpiresIn = SignOptions['expiresIn'];
export type MaxAge = CookieOptions['maxAge'];

export const jwtExpiryToCookieAge = (expiresIn: ExpiresIn): MaxAge => {
  if (typeof expiresIn === 'string') return ms(expiresIn); // e.g. '15m' → 900000
  if (typeof expiresIn === 'number') return expiresIn * 1000; // seconds → ms
  return undefined;
};
