import type { Request, Response } from 'express';

import { DEVICE_ID_COOKIE } from '../domain/deviceId.constants.js';
import type { DeviceIdManager } from './deviceId.manager.js';

export class DeviceIdService {
  constructor(private readonly deviceIdManager: DeviceIdManager) {}

  issueDeviceId() {
    return this.deviceIdManager.createDeviceId();
  }

  setDeviceIdCookie(res: Response, id: string) {
    res.cookie(DEVICE_ID_COOKIE, id);
  }

  setDeviceIdInReq(req: Request, id: string) {
    req.deviceId = id;
  }
  getDeviceId(req: Request) {
    return req.deviceId;
  }
  clearDeviceId(req: Request) {
    delete req.deviceId;
  }
}
