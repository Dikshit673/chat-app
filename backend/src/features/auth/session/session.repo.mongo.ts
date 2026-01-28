import { objectIdParser } from '@/features/shared/utils/objectId.parser.js';
import type { UserId } from '@/features/user/user.types.js';
import {
  ISessionDocument,
  SessionModel,
} from '@/infra/db/models/session.model.js';

import type { SessionRepo } from './session.repo.js';
import type {
  InputSessionPayload,
  Session,
  SessionId,
} from './session.types.js';

export class SessionRepoMongo implements SessionRepo {
  async create(session: InputSessionPayload): Promise<Session> {
    const doc = await SessionModel.create({
      userId: session.userId,
      refreshTokenHash: session.refreshTokenHash,
      userAgent: session.userAgent,
      ip: session.ip,
      isValid: session.isValid,
    });

    return this.mapSessionDoc(doc);
  }

  async findById(sessionId: SessionId): Promise<Session | null> {
    const doc = await SessionModel.findById(sessionId);
    if (!doc) return null;

    return this.mapSessionDoc(doc);
  }

  async findByUserId(userId: UserId): Promise<Session | null> {
    const doc = await SessionModel.findOne({ userId });
    if (!doc) return null;
    return this.mapSessionDoc(doc);
  }

  async invalidate(sessionId: SessionId): Promise<void> {
    await SessionModel.findByIdAndUpdate(sessionId, {
      $set: { isValid: false },
    });
  }

  async replaceRefreshTokenBySessionId(
    sessionId: SessionId,
    refreshTokenHash: string
  ): Promise<void> {
    await SessionModel.updateOne(
      { _id: sessionId, isValid: true },
      { $set: { refreshTokenHash } }
    );
  }

  async replaceRefreshTokenByUserId(
    userId: UserId,
    refreshTokenHash: string
  ): Promise<void> {
    await SessionModel.updateOne(
      { userId: userId, isValid: true },
      { $set: { refreshTokenHash } }
    );
  }

  private mapSessionDoc(doc: ISessionDocument): Session {
    return Object.freeze({
      id: objectIdParser.asSessionId(doc._id),
      userId: objectIdParser.asUserId(doc.userId),
      refreshTokenHash: doc.refreshTokenHash,
      userAgent: doc.userAgent,
      ip: doc.ip,
      isValid: doc.isValid,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
