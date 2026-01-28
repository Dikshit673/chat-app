import { UserId } from '@/features/user/user.types.js';

import type { SessionRepo } from './session.repo.js';
import type {
  InputSessionPayload,
  Session,
  SessionId,
} from './session.types.js';

export class SessionService {
  constructor(private readonly sessionRepo: SessionRepo) {}

  private async getUserSession(userId: UserId): Promise<Session | null> {
    return this.sessionRepo.findByUserId(userId);
  }

  private async saveNewSession(input: InputSessionPayload): Promise<Session> {
    return this.sessionRepo.create(input);
  }

  private async updateUserSession(
    userId: UserId,
    refreshTokenHash: string
  ): Promise<void> {
    this.sessionRepo.replaceRefreshTokenByUserId(userId, refreshTokenHash);
  }

  private async invalidateUserSession(sessionId: SessionId): Promise<void> {
    this.sessionRepo.invalidate(sessionId);
  }

  async rotate(userId: UserId, refreshToken: string) {
    const session = await this.getUserSession(userId);

    if (session) {
      await this.invalidateUserSession(session.id);
      await this.updateUserSession(session.userId, refreshToken);
      return;
    }

    await this.saveNewSession({
      userId,
      refreshTokenHash: refreshToken,
      isValid: true,
    });
  }

  async logout(userId: UserId) {
    const session = await this.getUserSession(userId);
    if (!session) throw new Error('session not found');
    await this.invalidateUserSession(session.id);
  }
}
