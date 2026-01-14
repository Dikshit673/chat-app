import { SessionModel } from '@/models/session.model.js';
import { UserId } from '@/modules/user/user.types.js';
import { userIdSchema } from '@/modules/user/user.validation.schema.js';

import type { SessionRepository } from './session.repository.js';
import type {
  InputSessionPayload,
  Session,
  SessionId,
} from './session.types.js';
import { sessionIdSchema } from './session.validation.js';

export class SessionRepositoryMongo implements SessionRepository {
  async create(session: InputSessionPayload): Promise<Session> {
    const doc = await SessionModel.create({
      userId: session.userId,
      refreshTokenHash: session.refreshTokenHash,
      userAgent: session.userAgent,
      ip: session.ip,
      isValid: session.isValid,
    });

    const sessionOut: Session = {
      id: sessionIdSchema.parse(doc._id.toString()),
      userId: userIdSchema.parse(doc.userId.toString()),
      refreshTokenHash: doc.refreshTokenHash,
      userAgent: doc.userAgent,
      ip: doc.ip,
      isValid: doc.isValid,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };

    return sessionOut;
  }

  async findById(sessionId: SessionId): Promise<Session | null> {
    const doc = await SessionModel.findById(sessionId);
    if (!doc) return null;

    return {
      id: sessionIdSchema.parse(doc._id.toString()),
      userId: userIdSchema.parse(doc.userId.toString()),
      refreshTokenHash: doc.refreshTokenHash,
      userAgent: doc.userAgent,
      ip: doc.ip,
      isValid: doc.isValid,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findByUserId(userId: UserId): Promise<Session | null> {
    const doc = await SessionModel.findOne({ userId }).lean();
    if (!doc) return null;
    return {
      id: sessionIdSchema.parse(doc._id.toString()),
      userId: userIdSchema.parse(doc.userId.toString()),
      refreshTokenHash: doc.refreshTokenHash,
      userAgent: doc.userAgent,
      ip: doc.ip,
      isValid: doc.isValid,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async invalidate(sessionId: SessionId): Promise<void> {
    await SessionModel.findByIdAndUpdate(sessionId, {
      $set: { isValid: false },
    });
  }

  async replaceRefreshToken(
    sessionId: SessionId,
    refreshTokenHash: string
  ): Promise<void> {
    await SessionModel.updateOne(
      { _id: sessionId, isValid: true },
      { $set: { refreshTokenHash } }
    );
  }
}
