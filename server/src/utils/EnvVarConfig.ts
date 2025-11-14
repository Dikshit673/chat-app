import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

export const envSchema = z.object({
  // Application settings
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  PORT: z.coerce.number().default(3000),

  // MongoDB
  MONGODB_URI: z.string(),
  MONGODB_DB_NAME: z.string(),
  MONGODB_AUTH_SOURCE: z.string().optional(),

  // Cloudinary
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_ROOT_FOLDER_NAME: z.string().default('chatsApp'),

  // JWT
  ACC_JWT_SECRET: z.string(),
  REF_JWT_SECRET: z.string(),

  // Cookies
  ACC_COOKIE_NAME: z.string(),
  REF_COOKIE_NAME: z.string(),

  // URLs
  CLIENT_URL: z.url(),
});

export type EnvVarsType = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    z.treeifyError(parsed.error)
  );
  process.exit(1);
}

const _env = parsed.data;

const IS_DEV = _env.NODE_ENV === 'development';

const EnvVars = { ..._env, IS_DEV };

export { EnvVars };
