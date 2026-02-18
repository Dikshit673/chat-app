import type { Request, Response } from 'express';

import type { CookieKeys } from './auth.cookie.constants.js';
import type { CookieRegistry } from './auth.cookie.registry.js';

export class AuthCookieManager {
  constructor(private readonly registry: CookieRegistry) {}

  get(req: Request, key: CookieKeys) {
    return this.registry[key].get(req);
  }

  set(res: Response, key: CookieKeys, value: string) {
    this.registry[key].set(res, value);
  }

  clear(res: Response, key: CookieKeys) {
    this.registry[key].clear(res);
  }

  clearMany(res: Response, keys: CookieKeys[]) {
    keys.forEach((k) => this.clear(res, k));
  }
}
