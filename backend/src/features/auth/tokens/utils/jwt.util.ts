import jwt from 'jsonwebtoken';
import z from 'zod';

export class JwtToken<T extends object> {
  private readonly tokenSchema: z.Schema<T>;
  private readonly jwtSecret: string;
  private readonly signOptions: jwt.SignOptions = {
    algorithm: 'HS256',
  };
  private readonly verifyOptions: jwt.VerifyOptions = {
    algorithms: ['HS256'],
  };
  constructor(options: ConfigOptions<T>) {
    this.tokenSchema = options.schema;
    this.jwtSecret = options.secret;
    if (options.signOptions) this.signOptions = options.signOptions;
    if (options.verifyOptions) this.verifyOptions = options.verifyOptions;
  }

  signPayload(payload: object): string {
    const safeTokenPayload = this.parsePayload(payload);
    return jwt.sign(safeTokenPayload, this.jwtSecret, this.signOptions);
  }

  getPayload(token: string): T {
    const payload = this.verifyToken(token, this.verifyOptions);
    return this.parsePayload(payload);
  }

  private parsePayload(payload: object): T {
    const { success, data, error } = this.tokenSchema.safeParse(payload);
    if (!success) throw new Error(error.message);
    return data;
  }

  private verifyToken(
    token: string,
    options?: jwt.VerifyOptions
  ): jwt.JwtPayload {
    const decoded = jwt.verify(token, this.jwtSecret, options);
    if (typeof decoded !== 'object' || decoded === null) {
      throw new Error('Invalid JWT payload type');
    }
    return decoded;
  }
}

type ConfigOptions<T extends object> = {
  schema: z.Schema<T>;
  secret: string;
  signOptions?: jwt.SignOptions;
  verifyOptions?: jwt.VerifyOptions;
};

export class JwtConfig<T extends object> {
  public readonly schema: z.Schema<T>;
  public readonly secret: string;
  public readonly signOptions?: jwt.SignOptions;
  public readonly verifyOptions?: jwt.VerifyOptions;
  constructor(config: ConfigOptions<T>) {
    this.schema = config.schema;
    this.secret = config.secret;
    this.signOptions = config.signOptions;
    this.verifyOptions = config.verifyOptions;
  }
}
