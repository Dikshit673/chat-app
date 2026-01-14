import { Router } from 'express';

import type { v1ControllersType } from '../controllers/index.js';
import type { v1MiddlewaresType } from '../middlewares/index.js';

export function authRoutes(
  authControllers: v1ControllersType['auth'],
  authMiddlewares: v1MiddlewaresType['auth']
) {
  const router = Router();

  const { register, login, refresh, logout, checkAuth } = authControllers;
  const { requireAuth, optionalAuth } = authMiddlewares;

  router.post('/register', register);
  router.post('/login', login);
  router.post('/refresh', refresh);
  router.post('/logout', requireAuth, logout);
  router.get('/check-auth', optionalAuth, checkAuth);

  return router;
}
