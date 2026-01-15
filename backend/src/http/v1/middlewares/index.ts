import { authMiddleware } from '@/features/auth/auth.middleware.js';
import { RequiredServices } from '@/types/httpServices.js';

export const v1Middlewares = (services: RequiredServices) => {
  return {
    auth: authMiddleware(services.tokenService),
  };
};

export type v1MiddlewaresType = ReturnType<typeof v1Middlewares>;
