import type z from 'zod';

import { schemaValidation } from '@/utils/zod/schemaValidation.js';

import {
  type AccessTokenPayload,
  type RefreshTokenPayload,
} from './auth.token.schema.js';

export class JwtValidation {
  private accessTokenSchema: z.Schema<AccessTokenPayload>;
  private refreshTokenSchema: z.Schema<RefreshTokenPayload>;
  private schemaValidation: <T>(schema: z.Schema<T>, inputData: unknown) => T;

  constructor(
    accessTokenSchema: z.Schema<AccessTokenPayload>,
    refreshTokenSchema: z.Schema<RefreshTokenPayload>
  ) {
    this.accessTokenSchema = accessTokenSchema;
    this.refreshTokenSchema = refreshTokenSchema;
    this.schemaValidation = schemaValidation;
  }

  validateAccessToken(payload: unknown): AccessTokenPayload {
    return this.schemaValidation(this.accessTokenSchema, payload);
  }

  validateRefreshToken(payload: unknown): RefreshTokenPayload {
    return this.schemaValidation(this.refreshTokenSchema, payload);
  }
}
