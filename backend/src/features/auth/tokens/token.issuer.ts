import { UserId } from '@/features/user/user.types.js';

import { AuthTokens } from '../auth.service.js';
import { SafeUserPayload } from './token.schema.js';
import { TokenService } from './token.service.js';

export class TokenIssuer {
  constructor(private readonly tokenService: TokenService) {}

  getAccessPayload(token: string) {
    return this.tokenService.accessToken.getPayload(token);
  }

  issueAccess(payload: SafeUserPayload) {
    return this.tokenService.accessToken.signPayload(payload);
  }

  getRefreshPayload(token: string) {
    return this.tokenService.refreshToken.getPayload(token);
  }

  issueRefresh(payload: SafeUserPayload) {
    return this.tokenService.refreshToken.signPayload(payload);
  }

  issueCsrf() {
    return this.tokenService.csrfToken.create();
  }

  issueDeviceId() {
    return this.tokenService.deviceIdToken.create();
  }

  issueTokens(id: UserId): AuthTokens {
    return {
      accessToken: this.issueAccess({ id }),
      refreshToken: this.issueRefresh({ id }),
      csrfToken: this.issueCsrf(),
    };
  }
}
