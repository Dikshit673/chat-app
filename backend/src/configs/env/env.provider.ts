import dotenv from 'dotenv';

import { container } from '@/application/express/domain/app.container.js';
import { Logger } from '@/services/index.js';

import { Env } from './env.js';
import { envSchema } from './env.schema.js';

dotenv.config();

export const ENV = container.singleton('Env', () => {
  const env = new Env(process.env, envSchema, new Logger('ENV', 'info'));
  env.load();
  return env.get();
});

export const IS_PROD = ENV.NODE_ENV === 'production';

export const IS_DEV = ENV.NODE_ENV === 'development';

export const IS_TEST = ENV.NODE_ENV === 'test';
