import { V1Services } from '@/infra/app/app.container.js';
import { ApiError } from '@/utils/api/error.util.js';
import { asyncHandler } from '@/utils/funcHandlers.js';

export function authMiddleware(services: V1Services) {
  const { tokenIssuer, cookieIssuer } = services;
  return {
    requiredAuth: asyncHandler(async (req, _res, next) => {
      const token = cookieIssuer.getAccessCookies(req);
      if (!token) throw new ApiError(401, 'Unauthorized');

      try {
        const user = tokenIssuer.getAccessPayload(token);
        req.user = user;
        next();
      } catch {
        throw new ApiError(401, 'Unauthorized');
      }
    }),
    optionalAuth: asyncHandler(async (req, _res, next) => {
      const token = cookieIssuer.getAccessCookies(req);
      if (!token) return next();
      try {
        const user = tokenIssuer.getAccessPayload(token);
        req.user = user;
        next();
      } catch {
        next();
      }
    }),
  };
}

export type AuthMiddleware = ReturnType<typeof authMiddleware>;
