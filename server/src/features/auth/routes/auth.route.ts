import { Router } from 'express';
import {
  checkAuth,
  login,
  logout,
  refresh,
  register,
} from '../controllers/index.js';
import { protectRoute } from '@/middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh', refresh);

router.get('/check-auth', protectRoute, checkAuth);

export { router as authRoutes };
