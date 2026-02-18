import { Router } from 'express';

import type { AuthController } from '../controllers/auth.controller.js';
import type { AuthMiddleware } from '../middlewares/auth.middleware.js';

export class AuthRouter {
  public readonly path: string;
  public readonly router: Router;

  constructor(
    private readonly controllers: AuthController,
    private readonly middlewares: AuthMiddleware
  ) {
    this.path = '/auth';
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/register', this.controllers.register);
    this.router.post('/login', this.controllers.login);
    this.router.post('/refresh', this.controllers.refresh);
    this.router.post(
      '/logout',
      this.middlewares.csrfProtection,
      this.middlewares.requiredAuth,
      this.controllers.logout
    );
    this.router.get(
      '/check-auth',
      this.middlewares.optionalAuth,
      this.controllers.checkAuth
    );
  }
}
