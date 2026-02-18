import { container } from '@/application/express/domain/app.container.js';

import { DeviceIdMiddleware } from '../api/deviceId.middleware.js';
import { DeviceId } from '../core/deviceId.js';
import { DeviceIdManager } from '../core/deviceId.manager.js';
import { DeviceIdService } from '../core/deviceId.service.js';

const deviceId = () => container.singleton('DeviceId', () => new DeviceId());

const deviceIdManager = () =>
  container.singleton('DeviceIdManager', () => new DeviceIdManager(deviceId()));

const deviceIdService = () =>
  container.singleton(
    'DeviceIdService',
    () => new DeviceIdService(deviceIdManager())
  );

export const deviceIdMiddlewareFn = () =>
  container.singleton('DeviceIdMiddleware', () => {
    const { generateDeviceId } = new DeviceIdMiddleware(deviceIdService());
    return generateDeviceId;
  });
