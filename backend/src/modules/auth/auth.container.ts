import { TokenService } from '@/modules/auth/token/token.service.js';
import { UserRepository } from '@/modules/user/user.repository.js';

import { AuthService } from './auth.service.js';

// modules/auth/auth.container.ts
export function buildAuthModule(deps: { userRepo: UserRepository }) {
  const tokenService = new TokenService();
  const authService = new AuthService(deps.userRepo, tokenService);

  return {
    authService,
    tokenService,
  };
}
