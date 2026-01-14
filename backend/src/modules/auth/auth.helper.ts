import type { Response } from 'express';

import type { AuthTokens } from '@/modules/auth/auth.service.js';
import {
  clearAccessCookies,
  clearCsrfCookies,
  clearRefreshCookies,
  setAccessCookie,
  setCsrfCookie,
  setRefreshCookie,
} from '@/utils/auth/cookies.js';

export function setAuthCookies(res: Response, tokens: AuthTokens) {
  setAccessCookie(res, tokens.accessToken);
  setRefreshCookie(res, tokens.refreshToken);
  setCsrfCookie(res, tokens.csrfToken);
}

export function clearAuthCookies(res: Response) {
  clearAccessCookies(res);
  clearRefreshCookies(res);
  clearCsrfCookies(res);
}
