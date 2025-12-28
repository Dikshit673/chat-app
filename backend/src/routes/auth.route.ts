import { Router } from 'express';

import {
  checkAuth,
  login,
  logout,
  refresh,
  register,
} from '@/controllers/auth/index.js';
import { optionalAuth, protectRoute } from '@/middlewares/auth.middleware.js';
import { csrfProtection } from '@/middlewares/csrf.middleware.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refresh);

// csrfProtection

router.post('/logout', protectRoute, logout);

router.get('/check-auth', optionalAuth, checkAuth);

export { router as authRoutes };
