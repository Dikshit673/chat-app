import crypto from 'crypto';
import { CookieOptions, Request, Response } from 'express';
import z from 'zod';

import { AppEnv } from '@/lib/AppEnv.js';

const IS_PROD = !AppEnv.IS_DEV;
const DEVICE_ID_COOKIE: { name: string; options: CookieOptions } = {
  name: 'device_id',
  options: {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: (IS_PROD ? 'Strict' : 'Lax') as 'strict' | 'lax' | 'none',
    maxAge: 365 * 24 * 60 * 60 * 1000,
  },
};

export const deviceIdCookieSchema = z
  .string()
  .refine((val) => !val || val.length > 0, 'Invalid device id cookie format');

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
