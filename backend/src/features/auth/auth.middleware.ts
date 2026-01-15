import { COOKIE_NAMES } from '@/constants.js';
import type { TokenService } from '@/features/auth/token/token.service.js';
import { ApiError } from '@/utils/ApiError.js';
import { asyncHandler } from '@/utils/functionHandlers.js';

export function authMiddleware(tokenService: TokenService) {
  return {
    requireAuth: asyncHandler(async (req, _res, next) => {
      const token = req.cookies[COOKIE_NAMES.access] as string | undefined;
      if (!token) throw new ApiError(401, 'Unauthorized');

      try {
        const user = tokenService.getAccessTokenPayload(token);
        req.user = user;
        next();
      } catch {
        throw new ApiError(401, 'Unauthorized');
      }
    }),
    optionalAuth: asyncHandler(async (req, _res, next) => {
      const token = req.cookies[COOKIE_NAMES.access] as string | undefined;
      if (!token) return next();
      try {
        const user = tokenService.getAccessTokenPayload(token);
        req.user = user;
        next();
      } catch {
        next();
      }
    }),
  };
}
