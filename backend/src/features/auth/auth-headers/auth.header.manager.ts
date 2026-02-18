import type { Request, Response } from 'express';

import type { AuthHeaderKey } from './auth.header.constants.js';
import type { AuthHeaderRegistry } from './auth.header.registry.js';

export class AuthHeaderManager {
  constructor(private readonly registry: AuthHeaderRegistry) {}

  get(req: Request, key: AuthHeaderKey) {
    return this.registry[key].get(req);
  }

  set(res: Response, key: AuthHeaderKey, value: string) {
    this.registry[key].set(res, value);
  }

  clear(res: Response, key: AuthHeaderKey) {
    this.registry[key].clear(res);
  }

  clearMany(res: Response, keys: AuthHeaderKey[]) {
    keys.forEach((k) => this.clear(res, k));
  }
}
