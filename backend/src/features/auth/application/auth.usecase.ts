import { type UserId } from '@/features/user/domain/user.types.js';

import type { AuthTokenService } from '../auth-tokens/auth.token.service.js';
import { AuthService } from './auth.service.js';

export class AuthUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: AuthTokenService
  ) {}

  async register(email: string, password: string, name: string) {
    const user = await this.authService.register(email, password, name);

    const tokens = this.tokenService.issueTokens(user);
    // await this.sessionService.rotate(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async login(email: string, password: string) {
    const user = await this.authService.login(email, password);

    const tokens = this.tokenService.issueTokens(user);
    // await this.sessionService.rotate(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async refresh(refreshToken: string) {
    const payload = this.tokenService.getRefreshPayload(refreshToken);
    const user = await this.authService.getMe(payload.id);

    const tokens = this.tokenService.issueTokens(user);
    // await this.sessionService.rotate(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  // async logout(userId: UserId) {
  //   await this.sessionService.logout(userId);
  // }

  async checkMe(userId: UserId) {
    const user = await this.authService.getMe(userId);

    const tokens = this.tokenService.issueTokens(user);
    // await this.sessionService.rotate(user.id, tokens.refreshToken);

    return { user, tokens };
  }
}
