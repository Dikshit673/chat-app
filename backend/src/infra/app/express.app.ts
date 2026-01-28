import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';

import { AppEnvType } from '@/configs/AppEnvs.js';
import { globalError } from '@/exceptions/error.middleware.js';
import { AppMiddleware } from '@/infra/app/app.middleware.js';
import { AppRouter } from '@/infra/app/app.router.js';
import { rateLimiter } from '@/lib/rateLimit.js';

type AppConfig = {
  port: string | number;
  corsOrigin: string;
  routers?: AppRouter;
  middlewares?: AppMiddleware;
  environment: AppEnvType['NODE_ENV'];
};

class App {
  public app: Application;

  constructor(private readonly config: AppConfig) {
    this.app = express();

    this.setupMiddlewares();
    this.rateLimit();
    this.setupRoutes();
    this.setupErrors();
  }

  public listen() {
    const { port } = this.config;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private setupMiddlewares() {
    this.app.use(cors({ origin: this.config.corsOrigin, credentials: true }));
    this.app.use(express.static(path.join(process.cwd(), 'public')));
    this.app.use(express.json({ limit: '16kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '16kb' }));
    this.app.use(cookieParser());

    for (const middleware of this.config.middlewares ?? []) {
      this.app.use(middleware.middleware);
    }
  }

  private rateLimit() {
    this.app.use(rateLimiter(1000));
    this.app.use('/api', rateLimiter(100));
    this.app.use('/api/v1/auth', rateLimiter(20));
  }

  private setupRoutes() {
    for (const router of this.config.routers ?? []) {
      this.app.use(router.path, router.router);
    }
  }

  private setupErrors() {
    this.app.use(globalError);
  }
}

export default App;
