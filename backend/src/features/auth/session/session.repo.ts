import type {
  InputSessionPayload,
  Session,
  SessionId,
} from './session.types.js';

export interface SessionRepo {
  create(session: InputSessionPayload): Promise<Session>;
  findById(sessionId: SessionId): Promise<Session | null>;
  findByUserId(userId: string): Promise<Session | null>;
  invalidate(sessionId: SessionId): Promise<void>;
  replaceRefreshTokenBySessionId(
    sessionId: SessionId,
    refreshTokenHash: string
  ): Promise<void>;
  replaceRefreshTokenByUserId(
    userId: string,
    refreshTokenHash: string
  ): Promise<void>;
}
