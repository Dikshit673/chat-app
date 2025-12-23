import z from 'zod';

const envSchema = z.object({
  VITE_NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VITE_APP_TITLE: z.string(),
  VITE_API_URL: z.string(),
  VITE_SOCKET_URL: z.string(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    z.treeifyError(parsed.error)
  );
  throw new Error('Invalid environment variables');
}

export const AppEnvs = parsed.data;

export type EnvType = typeof AppEnvs;
