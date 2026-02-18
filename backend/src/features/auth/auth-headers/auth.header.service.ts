import type { Request } from 'express';

import type { AuthHeaderManager } from './auth.header.manager.js';

export class AuthHeaderService {
  constructor(private readonly authHeaderManager: AuthHeaderManager) {}

  // access token
  getAccess(req: Request) {
    const token = this.authHeaderManager.get(req, 'ACCESS');
    if (!token) throw new Error('Access token missing');
    return this.getAccessTokenFromHeader(token);
  }
  // csrf token
  getCsrf(req: Request) {
    const token = this.authHeaderManager.get(req, 'CSRF');
    if (!token) throw new Error('CSRF token missing');
    return token;
  }

  private getAccessTokenFromHeader(token: string) {
    const tokenWithoutBearer = token.startsWith('Bearer ')
      ? token.slice(7)
      : null;
    if (!tokenWithoutBearer) throw new Error('Access token missing');
    return tokenWithoutBearer;
  }
}
