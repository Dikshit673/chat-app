import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import path from 'path';

import { ENV } from '@/configs/env/index.js';
import { deviceIdMiddlewareFn } from '@/features/deviceId/index.js';
import { rateLimitLib } from '@/lib/express-rate-limit/index.js';
import type { Logger } from '@/services/index.js';
import { globalError } from '@/utils/error/error.middleware.js';

import type { Routers } from '../routers/core/base.router.js';

export type AppDeps = {
  routers: Routers;
  logger: Logger;
};

export class App {
  private app: Application;
  private readonly corsOrigin: string;
  private readonly routers: Routers;
  private readonly logger: Logger;

  constructor(deps: AppDeps) {
    this.corsOrigin = ENV.FRONTEND_URL;
    this.routers = deps.routers;
    this.logger = deps.logger;

    this.app = express();

    this.logger.info(`⚙️  Initializing Express app`);

    this.setupMiddlewares();
    this.rateLimit();
    this.setupRoutes();
    this.setupErrors();

    this.logger.info('🚀 Express app initialized');
  }

  public getApp() {
    return this.app;
  }

  private setupMiddlewares() {
    this.app.use(cors({ origin: this.corsOrigin, credentials: true }));
    this.app.use(express.static(path.join(process.cwd(), 'public')));
    this.app.use(express.json({ limit: '16kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '16kb' }));
    this.app.use(cookieParser());
    this.app.use(deviceIdMiddlewareFn());
  }

  private rateLimit() {
    this.app.use('/api/v1/auth', rateLimitLib.limiter(20));
    this.app.use('/api', rateLimitLib.limiter(100));
    this.app.use(rateLimitLib.limiter(1000));
  }

  private setupRoutes() {
    this.routers.forEach((router) => this.app.use(router.path, router.router));
  }

  private setupErrors() {
    this.app.use(globalError);
  }
}
