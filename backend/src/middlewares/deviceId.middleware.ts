import { Request } from 'express';

import { DEVICE_ID_COOKIE_NAME } from '@/constants.js';
import { setDeviceIdCookie } from '@/utils/auth/cookies.js';
import { syncHandler } from '@/utils/syncHandler.js';

const generateDeviceId = () => crypto.randomUUID();

function getDeviceId(req: Request) {
  const deviceId = req.cookies[DEVICE_ID_COOKIE_NAME] as string | undefined;
  if (!deviceId) return null;
  return deviceId;
}

export const deviceIdMiddleware = () =>
  syncHandler((req, res, next) => {
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
    return next();
  });
