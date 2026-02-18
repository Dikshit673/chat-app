import { Router } from 'express';

export type CustomRouter = {
  path: string;
  router: Router;
};

export type Routers = CustomRouter[];

export abstract class BaseRouter {
  public readonly path: string;
  public readonly router: Router;

  protected constructor(path: string) {
    this.path = path;
    this.router = Router();
  }

  protected abstract initRoutes(): void;
}
