import { Router } from 'express';

import { V1Services } from '@/infra/app/app.container.js';

import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export function authRoutes(services: V1Services) {
  const { register, login, refresh, logout, checkAuth } =
    authController(services);
  const { requiredAuth, optionalAuth } = authMiddleware(services);

  const router = Router();

  router.post('/register', register);
  router.post('/login', login);
  router.post('/refresh', refresh);
  router.post('/logout', requiredAuth, logout);
  router.get('/check-auth', optionalAuth, checkAuth);

  return router;
}
