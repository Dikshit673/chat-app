import { BaseRouter, type Routers } from '../../../core/base.router.js';

export class V1Router extends BaseRouter {
  public readonly routers: Routers;
  constructor(path: string, routers: Routers) {
    super(path);
    this.routers = routers;
    this.initRoutes();
  }

  protected initRoutes() {
    this.routers.forEach((router) =>
      this.router.use(router.path, router.router)
    );
  }
}
