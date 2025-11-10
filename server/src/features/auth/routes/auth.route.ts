import { Router } from 'express';
import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { logout } from '../controllers/logout.js';
import { refresh } from '../controllers/refresh.js';
import { checkAuth } from '../controllers/checkAuth.js';
import { protectRoute } from '@/middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh', refresh);

router.get('/check-auth', protectRoute, checkAuth);

export { router as authRoutes };
