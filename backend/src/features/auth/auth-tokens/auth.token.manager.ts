import type { AuthTokenRegistry } from './auth.token.registry.js';
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './auth.token.schema.js';

export class AuthTokenManager {
  constructor(private readonly authTokenRegistry: AuthTokenRegistry) {}

  // Access
  issueAccess(payload: AccessTokenPayload) {
    return this.authTokenRegistry.ACCESS.createToken(payload);
  }
  getAccessPayload(token: string) {
    return this.authTokenRegistry.ACCESS.getPayload(token);
  }

  // Refresh
  issueRefresh(payload: RefreshTokenPayload) {
    return this.authTokenRegistry.REFRESH.createToken(payload);
  }
  getRefreshPayload(token: string) {
    return this.authTokenRegistry.REFRESH.getPayload(token);
  }

  // CSRF
  issueCsrf() {
    return this.authTokenRegistry.CSRF.createToken();
  }
}
