import type { SanitizedUser } from '@/features/user/domain/user.sanitizer.js';

import type { AuthTokenManager } from './auth.token.manager.js';
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './auth.token.schema.js';

export class AuthTokenService {
  constructor(private readonly authTokenManager: AuthTokenManager) {}

  issueTokens(user: SanitizedUser) {
    return {
      ACCESS: this.issueAccess({ id: user.id }),
      REFRESH: this.issueRefresh({ id: user.id }),
      CSRF: this.issueCsrf(),
    };
  }

  // Access
  issueAccess(payload: AccessTokenPayload) {
    return this.authTokenManager.issueAccess(payload);
  }
  getAccessPayload(token: string) {
    return this.authTokenManager.getAccessPayload(token);
  }

  // Refresh
  issueRefresh(payload: RefreshTokenPayload) {
    return this.authTokenManager.issueRefresh(payload);
  }
  getRefreshPayload(token: string) {
    return this.authTokenManager.getRefreshPayload(token);
  }

  // CSRF
  issueCsrf() {
    return this.authTokenManager.issueCsrf();
  }
}
