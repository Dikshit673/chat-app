import { NextFunction, Request, Response } from 'express';

import {
  generateDeviceId,
  getDeviceId,
  setDeviceIdCookie,
} from '@/utils/auth/deviceIdUtil.js';

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
