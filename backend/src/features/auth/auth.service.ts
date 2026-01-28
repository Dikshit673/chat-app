import type { UserRepo } from '@/features/user/user.repo.js';
import type { UserId } from '@/features/user/user.types.js';
import { comparePassword } from '@/lib/bcrypt.js';

import { sanitizeUser } from './auth.util.js';
import { SessionService } from './session/session.service.js';
import { TokenIssuer } from './tokens/token.issuer.js';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
};

export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly tokenIssuer: TokenIssuer,
    private readonly sessionService: SessionService
  ) {}

  async register(email: string, password: string, name: string) {
    const exists = await this.userRepo.findByEmail(email);
    if (exists) throw new Error('User already exists');

    const user = await this.userRepo.create({ email, name, password });
    const tokens = this.tokenIssuer.issueTokens(user.id);

    await this.sessionService.rotate(user.id, tokens.refreshToken);

    return { tokens, user: sanitizeUser(user) };
  }
  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const ok = await comparePassword(password, user.password);
    if (!ok) throw new Error('Invalid credentials');

    const tokens = this.tokenIssuer.issueTokens(user.id);
    await this.sessionService.rotate(user.id, tokens.refreshToken);

    return { tokens, user: sanitizeUser(user) };
  }
  async refresh(token: string) {
    const payload = this.tokenIssuer.getRefreshPayload(token);

    const user = await this.userRepo.findById(payload.id);
    if (!user) throw new Error('User not found');

    const tokens = this.tokenIssuer.issueTokens(user.id);
    await this.sessionService.rotate(user.id, tokens.refreshToken);

    return { tokens, user: sanitizeUser(user) };
  }
  async logout(userId: UserId) {
    await this.sessionService.logout(userId);
  }
  async checkMe(userId: UserId) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    return { user: sanitizeUser(user) };
  }
}
