import { deviceIdMiddleware } from '@/infra/http/api/v1/middlewares/deviceId.middleware.js';

import { AppServices } from './app.container.js';

export const buildAppMiddleware = (services: AppServices) => [
  {
    name: 'deviceId',
    middleware: deviceIdMiddleware(services.v1),
  },
];

export type AppMiddleware = ReturnType<typeof buildAppMiddleware>;
