import type { UserRepository } from '@/features/user/user.repository.js';
import type { UserId } from '@/features/user/user.types.js';
import { comparePassword } from '@/lib/bcrypt.js';

import { SessionRepositoryMongo } from './session/session.repository.mongo.js';
import type { TokenService } from './token/token.service.js';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
};

export class AuthService {
  private sessionRepo = new SessionRepositoryMongo();
  constructor(
    private userRepo: UserRepository,
    private tokenService: TokenService
  ) {}

  async register(email: string, password: string, name: string) {
    const exists = await this.userRepo.findByEmail(email);
    if (exists) throw new Error('User already exists');

    const user = await this.userRepo.create({ email, name, password });
    const tokens = this.issueTokens(user.id);
    return { tokens, user };
  }
  async login(email: string, password: string) {
    const foundUser = await this.userRepo.findByEmail(email);
    if (!foundUser) throw new Error('Invalid credentials');

    const ok = await comparePassword(password, foundUser.password);
    if (!ok) throw new Error('Invalid credentials');
    const { password: _, ...user } = foundUser;

    const tokens = this.issueTokens(user.id);
    const session = await this.sessionRepo.findByUserId(user.id);
    if (session) {
      await this.sessionRepo.invalidate(session.id);
      await this.sessionRepo.replaceRefreshToken(
        session.id,
        tokens.refreshToken
      );
    } else {
      await this.sessionRepo.create({
        userId: user.id,
        refreshTokenHash: tokens.refreshToken,
        isValid: true,
      });
    }

    return { tokens, user };
  }
  async logout(userId: UserId) {
    const session = await this.sessionRepo.findByUserId(userId);
    if (!session) throw new Error('session not found');
    await this.sessionRepo.invalidate(session.id);
  }
  async refresh(token: string) {
    const payload = this.tokenService.getRefreshTokenPayload(token);
    const userId = payload.id;
    const foundUser = await this.userRepo.findById(userId);
    if (!foundUser) throw new Error('User not found');
    const { password: _, ...user } = foundUser;
    const session = await this.sessionRepo.findByUserId(userId);
    const tokens: AuthTokens = this.issueTokens(userId);
    if (session) {
      await this.sessionRepo.invalidate(session.id);
      await this.sessionRepo.replaceRefreshToken(
        session.id,
        tokens.refreshToken
      );
    } else {
      await this.sessionRepo.create({
        userId,
        refreshTokenHash: tokens.refreshToken,
        isValid: true,
      });
    }
    return { tokens, user };
  }
  async checkMe(userId: UserId) {
    const foundUser = await this.userRepo.findById(userId);
    if (!foundUser) throw new Error('User not found');
    const { password: _, ...user } = foundUser;
    return { user };
  }

  private issueTokens(userId: UserId): AuthTokens {
    return {
      accessToken: this.tokenService.createAccessToken(userId),
      refreshToken: this.tokenService.createRefreshToken(userId),
      csrfToken: this.tokenService.createCsrfToken(),
    };
  }
}
