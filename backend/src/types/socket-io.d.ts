import type { AccessTokenPayload } from '@/features/auth/auth-tokens/index.ts';

declare module 'socket.io' {
  interface Socket {
    user?: AccessTokenPayload;
  }
}
