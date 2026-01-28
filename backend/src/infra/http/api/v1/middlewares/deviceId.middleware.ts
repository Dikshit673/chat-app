import { V1Services } from '@/infra/app/app.container.js';
import { asyncHandler } from '@/utils/funcHandlers.js';

export function deviceIdMiddleware(services: V1Services) {
  const { cookieIssuer, tokenIssuer } = services;
  return asyncHandler(async (req, res, next) => {
    const deviceId = cookieIssuer.getDeviceIdCookies(req);

    // generate new device id
    if (!deviceId) {
      const newDeviceId = tokenIssuer.issueDeviceId();
      cookieIssuer.setDeviceIdCookies(res, newDeviceId);
      req.deviceId = newDeviceId;
      return next();
    }

    // attach existing device id to request
    req.deviceId = deviceId;
    next();
  });
}

export type DeviceIdMiddleware = ReturnType<typeof deviceIdMiddleware>;
