import z from 'zod';

import type { Logger } from '@/services/index.js';

export class Env<T extends object> {
  private data!: Readonly<T>;

  constructor(
    private readonly envs: unknown,
    private readonly schema: z.ZodType<T>,
    private readonly logger: Logger
  ) {}

  load(): this {
    const result = this.schema.safeParse(this.envs);

    if (!result.success) {
      this.processError(result.error);
      throw new Error('Invalid environment variables');
    }

    this.data = Object.freeze(result.data);
    return this;
  }

  get(): Readonly<T> {
    return this.data;
  }

  private processError(error: z.ZodError<T>) {
    let message = '';

    for (const issue of error.issues) {
      message += `${issue.path.join('.')}\n`;
    }

    this.logger.error(`❌ Invalid environment variables:\n${message}`);
  }
}
