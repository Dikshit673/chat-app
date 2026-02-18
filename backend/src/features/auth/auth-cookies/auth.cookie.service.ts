import type { Request, Response } from 'express';

import type { AuthTokens } from '../auth-tokens/auth.token.types.js';
import type { AuthCookieManager } from './auth.cookie.manager.js';

export class AuthCookieService {
  constructor(private readonly authCookieManager: AuthCookieManager) {}

  // tokens
  setAuth(res: Response, tokens: AuthTokens) {
    this.authCookieManager.set(res, 'ACCESS', tokens.ACCESS);
    this.authCookieManager.set(res, 'REFRESH', tokens.REFRESH);
    this.authCookieManager.set(res, 'CSRF', tokens.CSRF);
  }

  clearAuth(res: Response) {
    this.authCookieManager.clearMany(res, ['ACCESS', 'REFRESH', 'CSRF']);
  }

  // access token
  getAccess(req: Request) {
    const token = this.authCookieManager.get(req, 'ACCESS');
    if (!token) throw new Error('Access token missing');
    return token;
  }
  // refresh token
  getRefresh(req: Request) {
    const token = this.authCookieManager.get(req, 'REFRESH');
    if (!token) throw new Error('Refresh token missing');
    return token;
  }
  // csrf token
  getCsrf(req: Request) {
    const token = this.authCookieManager.get(req, 'CSRF');
    if (!token) throw new Error('CSRF token missing');
    return token;
  }
}
