import z from 'zod';

import {
  jwtLib,
  type JwtSignOptions,
  type JwtVerifyOptions,
} from '@/lib/jwt/index.js';

export class JwtToken<T extends object> {
  constructor(
    private readonly tokenSchema: z.Schema<T>,
    private readonly jwtSecret: string,
    private readonly signOptions: JwtSignOptions = {
      algorithm: 'HS256',
      expiresIn: '1d',
      header: { typ: 'JWT', alg: 'HS256' },
    },
    private readonly verifyOptions: JwtVerifyOptions = {
      algorithms: ['HS256'],
    }
  ) {}

  createToken(payload: object): string {
    const safeTokenPayload = this.safeParse(payload);
    return this.sign(safeTokenPayload);
  }

  getPayload(token: string): T {
    const payload = this.verify(token);
    return this.safeParse(payload);
  }

  private safeParse(payload: object): T {
    const { success, data, error } = this.tokenSchema.safeParse(payload);
    if (!success) throw new Error(error.message);
    return data;
  }

  private sign(payload: object) {
    return jwtLib.sign(payload, this.jwtSecret, this.signOptions);
  }

  private verify(token: string) {
    const decoded = jwtLib.verify(token, this.jwtSecret, this.verifyOptions);
    if (typeof decoded !== 'object' || decoded === null) {
      throw new Error('Invalid JWT payload type');
    }
    return decoded;
  }
}
