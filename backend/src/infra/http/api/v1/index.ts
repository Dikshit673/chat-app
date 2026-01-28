import { Router } from 'express';

import { V1Services } from '@/infra/app/app.container.js';
import { authRoutes } from '@/infra/http/api/v1/routes/auth.route.js';

export function v1Router(services: V1Services) {
  // router instance
  const router = Router();

  // use all routes
  router.use('/auth', authRoutes(services));

  // return router instance
  return router;
}
