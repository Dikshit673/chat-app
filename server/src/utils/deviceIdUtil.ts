import crypto from 'crypto';
import { CookieOptions, Request, Response } from 'express';
import { EnvVars } from './EnvVarConfig.js';
import { deviceIdCookieSchema } from '@/lib/zod.js';

const IS_PROD = !EnvVars.IS_DEV;
const DEVICE_ID_COOKIE: { name: string; options: CookieOptions } = {
  name: 'device_id',
  options: {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: (IS_PROD ? 'Strict' : 'Lax') as 'strict' | 'lax' | 'none',
    maxAge: 365 * 24 * 60 * 60 * 1000,
  },
};

export const generateDeviceId = () => crypto.randomUUID();

export function getDeviceId(req: Request) {
  const deviceId = req.cookies[DEVICE_ID_COOKIE.name];
  const parsedDeviceId = deviceIdCookieSchema.safeParse(deviceId);
  if (!parsedDeviceId.success) return undefined;
  return parsedDeviceId.data;
}

export const setDeviceIdCookie = (res: Response, deviceId: string) => {
  const { name, options } = DEVICE_ID_COOKIE;
  res.cookie(name, deviceId, options);
};
