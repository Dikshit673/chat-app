import { sendApiResponse } from '@/utils/api/response.util.js';
import { reqHandler } from '@/utils/funcHandlers.js';

import { v1Router } from '../http/api/v1/index.js';
import { AppServices } from './app.container.js';

export const buildAppRouter = (services: AppServices) => [
  {
    path: '/',
    router: reqHandler((_, res) => sendApiResponse(res, 200, 'Hello World!')),
  },
  {
    path: '/health',
    router: reqHandler((_, res) => sendApiResponse(res, 200, 'OK')),
  },
  {
    path: '/ping',
    router: reqHandler((_, res) => sendApiResponse(res, 200, 'pong')),
  },
  {
    path: '/api/v1',
    router: v1Router(services.v1),
  },
];

export type AppRouter = ReturnType<typeof buildAppRouter>;
