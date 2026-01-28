import { Cookies } from './cookie.factory.js';
import { Cookie } from './cookie.util.js';

export class CookieService {
  public readonly accessToken: Cookie;
  public readonly refreshToken: Cookie;
  public readonly csrfToken: Cookie;
  public readonly deviceIdToken: Cookie;

  constructor(cookies: Cookies) {
    this.accessToken = cookies.accessToken;
    this.refreshToken = cookies.refreshToken;
    this.csrfToken = cookies.csrfToken;
    this.deviceIdToken = cookies.deviceIdToken;
  }
}
