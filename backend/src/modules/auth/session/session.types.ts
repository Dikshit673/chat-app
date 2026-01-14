import type { UserId } from '@/modules/user/user.types.js';
import type { Brand } from '@/types/brand.js';

export type SessionId = Brand<string, 'SessionId'>;

export interface Session {
  id: SessionId;
  userId: UserId;
  refreshTokenHash: string;
  userAgent?: string;
  ip?: string;
  isValid: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateSessionInput {
  userId: UserId;
  refreshToken: string;
  userAgent?: string;
  ip?: string;
}

export type InputSessionPayload = Pick<
  Session,
  'userId' | 'refreshTokenHash' | 'userAgent' | 'ip' | 'isValid'
>;
