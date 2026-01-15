import { authController } from '@/features/auth/auth.controller.js';
// import type { AuthService } from '@/modules/auth/auth.service.js';
import { RequiredServices } from '@/types/httpServices.js';

export const v1Controllers = (services: RequiredServices) => {
  return {
    auth: authController(services.authService),
  };
};

export type v1ControllersType = ReturnType<typeof v1Controllers>;
