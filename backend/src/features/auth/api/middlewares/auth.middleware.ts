import type { Request } from 'express';

import { ApiError } from '@/utils/error/error.js';
import { asyncHandler, reqHandler } from '@/utils/handler/reqHandlers.js';
import { sendApiResponse } from '@/utils/response/index.js';

import type { AuthCookieService } from '../../auth-cookies/auth.cookie.service.js';
import type { AuthTokenService } from '../../auth-tokens/auth.token.service.js';
import { HEADER_NAMES } from '../../domain/auth.constant.js';

export class AuthMiddleware {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly authCookieService: AuthCookieService
  ) {}

  requiredAuth = asyncHandler(async (req, _res, next) => {
    const token = this.authCookieService.getAccess(req);

    try {
      const user = this.authTokenService.getAccessPayload(token);
      req.user = user;
      next();
    } catch {
      throw new ApiError(401, 'Unauthorized');
    }
  });
  optionalAuth = asyncHandler(async (req, _res, next) => {
    const token = this.authCookieService.getAccess(req);
    if (!token) return next();
    try {
      const user = this.authTokenService.getAccessPayload(token);
      req.user = user;
      next();
    } catch {
      next();
    }
  });
  csrfProtection = reqHandler((req, res, next) => {
    const cookieToken = this.authCookieService.getCsrf(req);
    const headerToken = this.getTokenByHeader(req, HEADER_NAMES.CSRF);

    // check if csrf token is present
    if (!cookieToken || !headerToken)
      return sendApiResponse(res, 403, 'CSRF token missing');

    // check if csrf token is valid
    if (cookieToken !== headerToken)
      return sendApiResponse(res, 403, 'Invalid CSRF token');

    // csrf token is valid
    next();
  });
  private getTokenByHeader(req: Request, headerName: string): string | null {
    const rawToken = req.headers[headerName];
    const headerToken =
      typeof rawToken === 'string'
        ? rawToken
        : Array.isArray(rawToken)
          ? rawToken[0]
          : null;
    return headerToken;
  }
}

// export type AuthMiddleware = ReturnType<typeof authMiddleware>;
