import type { DeviceId } from '../core/deviceId.js';

export class DeviceIdManager {
  constructor(private readonly deviceId: DeviceId) {}

  createDeviceId() {
    return this.deviceId.create();
  }
}
