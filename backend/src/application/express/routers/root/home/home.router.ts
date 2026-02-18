import { asyncHandler } from '@/utils/handler/reqHandlers.js';
import { sendApiResponse } from '@/utils/response/index.js';

import { BaseRouter } from '../../core/base.router.js';

export class HomeRouter extends BaseRouter {
  constructor(path: string) {
    super(path);
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.get(
      '/',
      asyncHandler(async (_, res) => sendApiResponse(res, 200, 'Hello World!'))
    );

    this.router.get(
      '/health',
      asyncHandler(async (_, res) => sendApiResponse(res, 200, 'OK'))
    );

    this.router.get(
      '/ping',
      asyncHandler(async (_, res) => sendApiResponse(res, 200, 'pong'))
    );
  }
}
