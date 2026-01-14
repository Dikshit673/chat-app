import { Router } from 'express';

import type { RequiredServices } from '@/types/httpServices.js';

import { routes } from './routes/index.js';

export function v1Routes(services: RequiredServices) {
  // router instance
  const router = Router();

  //  get all routes
  const appRoutes = routes(services);

  //  use all routes
  router.use('/auth', appRoutes.auth);

  //   return router instance
  return router;
}
