import { CookieOptions, NextFunction, Request, Response } from 'express';

import { DEVICE_ID_COOKIE_NAME } from '@/constants.js';
import { COMMON_COOKIE_OPTIONS } from '@/utils/auth/cookies.js';

const deviceIdCookie: { name: string; options: CookieOptions } = {
  name: DEVICE_ID_COOKIE_NAME,
  options: {
    ...COMMON_COOKIE_OPTIONS,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  },
};

const generateDeviceId = () => crypto.randomUUID();

function getDeviceId(req: Request) {
  const { name } = deviceIdCookie;
  const deviceId = req.cookies[name] as string | undefined;
  if (!deviceId) return null;
  return deviceId;
}

const setDeviceIdCookie = (res: Response, deviceId: string) => {
  const { name, options } = deviceIdCookie;
  res.cookie(name, deviceId, options);
};

export const deviceIdMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const deviceId = getDeviceId(req);

    if (!deviceId) {
      const newDeviceId = generateDeviceId();
      setDeviceIdCookie(res, newDeviceId);
      req.deviceId = newDeviceId;
      return next();
    }

    req.deviceId = deviceId;

    next();
  };
