import { asyncHandler } from '@/utils/handler/reqHandlers.js';

import type { DeviceIdService } from '../core/deviceId.service.js';

export class DeviceIdMiddleware {
  constructor(private readonly deviceIdService: DeviceIdService) {}

  generateDeviceId = asyncHandler(async (req, res, next) => {
    let deviceId = this.deviceIdService.getDeviceId(req);

    // no device id found, then generate new device id
    if (!deviceId) {
      deviceId = this.deviceIdService.issueDeviceId();
      this.deviceIdService.setDeviceIdCookie(res, deviceId);
    }

    // else attach device id to request
    this.deviceIdService.setDeviceIdInReq(req, deviceId);
    next();
  });
}
