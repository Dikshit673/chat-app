import { container } from '@/application/express/domain/app.container.js';
import { userRepo } from '@/features/user/user.provider.js';

import { AuthController } from '../api/controllers/auth.controller.js';
import { AuthMiddleware } from '../api/middlewares/auth.middleware.js';
import { AuthRouter } from '../api/routers/auth.router.js';
import { AuthService } from '../application/auth.service.js';
import { AuthUseCase } from '../application/auth.usecase.js';
import { authCookieService } from '../auth-cookies/auth.cookie.provider.js';
import { authTokenService } from '../auth-tokens/auth.token.provider.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/auth.schema.js';
import { AuthValidation } from '../validation/auth.validation.js';

const authValidation = () =>
  container.singleton(
    'AuthValidation',
    () => new AuthValidation(loginUserSchema, registerUserSchema)
  );

// Services
const authService = () =>
  container.singleton('AuthService', () => new AuthService(userRepo()));

// UseCases
const authUseCase = () =>
  container.singleton(
    'AuthUseCase',
    () => new AuthUseCase(authService(), authTokenService())
  );

const authController = () =>
  container.singleton(
    'AuthController',
    () =>
      new AuthController(authUseCase(), authCookieService(), authValidation())
  );

export const authMiddleware = () =>
  container.singleton(
    'AuthMiddleware',
    () => new AuthMiddleware(authTokenService(), authCookieService())
  );

export const authRouter = () =>
  container.singleton(
    'AuthRouter',
    () => new AuthRouter(authController(), authMiddleware())
  );
