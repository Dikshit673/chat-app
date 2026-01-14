import type { RequiredServices } from '@/types/httpServices.js';

import { v1Controllers } from '../controllers/index.js';
import { v1Middlewares } from '../middlewares/index.js';
import { authRoutes } from './auth.route.js';

export const routes = (services: RequiredServices) => {
  const controller = v1Controllers(services);
  const middleware = v1Middlewares(services);

  const authRoute = authRoutes(controller.auth, middleware.auth);

  return {
    auth: authRoute,
  };
};
