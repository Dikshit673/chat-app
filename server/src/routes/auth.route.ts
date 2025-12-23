import { Router } from 'express';

import {
  checkAuth,
  login,
  logout,
  refresh,
  register,
} from '@/controllers/auth/index.js';
import { protectRoute } from '@/middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refresh);

router.post('/logout', protectRoute, logout);

router.get('/check-auth', protectRoute, checkAuth);

export { router as authRoutes };
