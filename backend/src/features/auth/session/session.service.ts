import crypto from 'crypto';

import type { SessionRepository } from './session.repository.js';
import type {
  InputSessionPayload,
  Session,
  SessionId,
} from './session.types.js';

export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  private hash(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async createSession(input: InputSessionPayload): Promise<Session> {
    return this.sessionRepo.create(input);
  }

  async validateRefreshToken(
    sessionId: SessionId,
    refreshToken: string
  ): Promise<Session> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session?.isValid) throw new Error('Invalid session');
    if (session.refreshTokenHash !== this.hash(refreshToken)) {
      throw new Error('Refresh token mismatch');
    }
    return session;
  }

  async rotateRefreshToken(
    sessionId: SessionId,
    newRefreshToken: string
  ): Promise<void> {
    await this.sessionRepo.replaceRefreshToken(
      sessionId,
      this.hash(newRefreshToken)
    );
  }

  async logout(sessionId: SessionId): Promise<void> {
    await this.sessionRepo.invalidate(sessionId);
  }
}
