import { Request, Response } from 'express';

import { AuthTokens } from '../auth.service.js';
import { CookieService } from './cookie.service.js';

export class CookieIssuer {
  constructor(private readonly cookieService: CookieService) {}

  getAccessCookies(req: Request) {
    return this.cookieService.accessToken.get(req);
  }

  setAccessCookies(res: Response, accessToken: string) {
    this.cookieService.accessToken.set(res, accessToken);
  }

  clearAccessCookies(res: Response) {
    this.cookieService.accessToken.clear(res);
  }

  getRefreshCookies(req: Request) {
    return this.cookieService.refreshToken.get(req);
  }

  setRefreshCookies(res: Response, refreshToken: string) {
    this.cookieService.refreshToken.set(res, refreshToken);
  }

  clearRefreshCookies(res: Response) {
    this.cookieService.refreshToken.clear(res);
  }

  getCsrfCookies(req: Request) {
    return this.cookieService.csrfToken.get(req);
  }

  setCsrfCookies(res: Response, csrfToken: string) {
    this.cookieService.csrfToken.set(res, csrfToken);
  }

  clearCsrfCookies(res: Response) {
    this.cookieService.csrfToken.clear(res);
  }

  getDeviceIdCookies(req: Request) {
    return this.cookieService.deviceIdToken.get(req);
  }

  setDeviceIdCookies(res: Response, deviceId: string) {
    this.cookieService.deviceIdToken.set(res, deviceId);
  }

  clearDeviceIdCookies(res: Response) {
    this.cookieService.deviceIdToken.clear(res);
  }

  setAuthCookies(res: Response, tokens: AuthTokens) {
    this.cookieService.accessToken.set(res, tokens.accessToken);
    this.cookieService.refreshToken.set(res, tokens.refreshToken);
    this.cookieService.csrfToken.set(res, tokens.csrfToken);
  }
  clearAuthCookies(res: Response) {
    this.cookieService.accessToken.clear(res);
    this.cookieService.refreshToken.clear(res);
    this.cookieService.csrfToken.clear(res);
  }
}
