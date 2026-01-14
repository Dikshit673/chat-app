import { COOKIE_NAMES } from '@/constants.js';
import type { AuthService } from '@/modules/auth/auth.service.js';
import { ApiError } from '@/utils/ApiError.js';
import { asyncHandler } from '@/utils/functionHandlers.js';
import { sendApiResponse } from '@/utils/sendResponse.js';

import { clearAuthCookies, setAuthCookies } from './auth.helper.js';
import { AuthValidation } from './auth.validation.js';

const validations = Object.freeze(new AuthValidation());

// http/controllers/auth.controller.ts
export function authController(authService: AuthService) {
  return {
    register: asyncHandler(async (req, res) => {
      const { email, password, name } = validations.register(req.body);
      const { tokens } = await authService.register(email, password, name);
      setAuthCookies(res, tokens);
      sendApiResponse(res, 201, 'User created successfully.');
    }),

    login: asyncHandler(async (req, res) => {
      const { email, password } = validations.login(req.body);
      const { user, tokens } = await authService.login(email, password);

      setAuthCookies(res, tokens);
      sendApiResponse(res, 200, 'Logged in successfully.', { user });
    }),

    logout: asyncHandler(async (req, res) => {
      const { user } = req;
      if (!user) throw new ApiError(400, 'User not found.');
      await authService.logout(user.id);
      clearAuthCookies(res);
      sendApiResponse(res, 200, 'Logged out successfully');
    }),

    logoutAll: asyncHandler(async (req, res) => {
      const { user } = req;
      if (!user) throw new ApiError(400, 'User not found.');
      await authService.logout(user.id);
      clearAuthCookies(res);
      sendApiResponse(res, 200, 'Logged out from all devices successfully');
    }),

    refresh: asyncHandler(async (req, res) => {
      const cookieToken = req.cookies[COOKIE_NAMES.refresh] as
        | string
        | undefined;
      if (!cookieToken) throw new ApiError(403, 'Forbidden');
      const { user, tokens } = await authService.refresh(cookieToken);
      setAuthCookies(res, tokens);
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
