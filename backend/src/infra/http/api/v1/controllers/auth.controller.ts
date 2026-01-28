import { COOKIE_NAMES } from '@/features/auth/auth.constant.js';
import { AuthValidation } from '@/features/auth/auth.validation.js';
import { V1Services } from '@/infra/app/app.container.js';
import { ApiError } from '@/utils/api/error.util.js';
import { sendApiResponse } from '@/utils/api/response.util.js';
import { asyncHandler } from '@/utils/funcHandlers.js';

const validations = Object.freeze(new AuthValidation());

// http/controllers/auth.controller.ts
export function authController(services: V1Services) {
  const { authService, cookieIssuer } = services;
  return {
    register: asyncHandler(async (req, res) => {
      const { email, password, name } = validations.register(req.body);
      const { tokens } = await authService.register(email, password, name);

      cookieIssuer.setAuthCookies(res, tokens);
      sendApiResponse(res, 201, 'User created successfully.');
    }),

    login: asyncHandler(async (req, res) => {
      const { email, password } = validations.login(req.body);
      const { user, tokens } = await authService.login(email, password);

      cookieIssuer.setAuthCookies(res, tokens);
      sendApiResponse(res, 200, 'Logged in successfully.', { user });
    }),

    logout: asyncHandler(async (req, res) => {
      const { user } = req;
      if (!user) throw new ApiError(400, 'User not found.');
      await authService.logout(user.id);
      cookieIssuer.clearAuthCookies(res);
      sendApiResponse(res, 200, 'Logged out successfully');
    }),

    logoutAll: asyncHandler(async (req, res) => {
      const { user } = req;
      if (!user) throw new ApiError(400, 'User not found.');
      await authService.logout(user.id);
      cookieIssuer.clearAuthCookies(res);
      sendApiResponse(res, 200, 'Logged out from all devices successfully');
    }),

    refresh: asyncHandler(async (req, res) => {
      const cookieToken = req.cookies[COOKIE_NAMES.REFRESH] as
        | string
        | undefined;
      if (!cookieToken) throw new ApiError(403, 'Forbidden');
      const { user, tokens } = await authService.refresh(cookieToken);
      cookieIssuer.setAuthCookies(res, tokens);
      sendApiResponse(res, 200, 'Refreshed successfully.', { user });
    }),

    checkAuth: asyncHandler(async (req, res) => {
      const inReqUser = req.user;
      if (!inReqUser) throw new ApiError(401, 'Unauthorized');
      const { user } = await authService.checkMe(inReqUser.id);
      sendApiResponse(res, 200, 'Authenticated successfully', { user });
    }),
  };
}

export type AuthController = ReturnType<typeof authController>;
