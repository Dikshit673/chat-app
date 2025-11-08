import { Router } from 'express';
import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { logout } from '../controllers/logout.js';
import { refresh } from '../controllers/refresh.js';
import { me } from '../controllers/me.js';
import { checkAuth } from '@/middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh', refresh);

router.get('/me', checkAuth, me);

export { router as authRoutes };
