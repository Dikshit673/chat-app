import { Router } from 'express';

const router = Router();

router.post('/register', async (_req, res) => {
  res.send('register');
});

router.post('/login', async (_req, res) => {
  res.send('login');
});

router.post('/logout', async (_req, res) => {
  res.send('logout');
});

router.post('/refresh', async (_req, res) => {
  res.send('refresh');
});

router.get('/me', async (_req, res) => {
  res.send('me');
});

export { router as authRoutes };
