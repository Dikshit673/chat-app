import { Request, Response } from 'express';

import { COOKIE_NAMES } from '@/constants.js';
import { reqHandler } from '@/utils/functionHandlers.js';

const generateDeviceId = () => crypto.randomUUID();

export const setDeviceIdCookie = (res: Response, deviceId: string) => {
  res.cookie(COOKIE_NAMES.deviceId, deviceId);
};

export const clearDeviceIdCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.deviceId);
};

function getDeviceId(req: Request) {
  const deviceId = req.cookies[COOKIE_NAMES.deviceId] as string | undefined;
  if (!deviceId) return null;
  return deviceId;
}

export const deviceIdMiddleware = reqHandler((req, res, next) => {
  // get device id
  const deviceId = getDeviceId(req);

  // generate new device id
  if (!deviceId) {
    const newDeviceId = generateDeviceId();
    setDeviceIdCookie(res, newDeviceId);
    req.deviceId = newDeviceId;
    return next();
  }

  // attach existing device id to request
  req.deviceId = deviceId;
  next();
});
