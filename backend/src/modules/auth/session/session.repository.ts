import type {
  InputSessionPayload,
  Session,
  SessionId,
} from './session.types.js';

export interface SessionRepository {
  create(session: InputSessionPayload): Promise<Session>;
  findById(sessionId: SessionId): Promise<Session | null>;
  invalidate(sessionId: SessionId): Promise<void>;
  replaceRefreshToken(
    sessionId: SessionId,
    refreshTokenHash: string
  ): Promise<void>;
}
