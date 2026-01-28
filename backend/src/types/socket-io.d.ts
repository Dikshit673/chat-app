import { SafeUserPayload } from '@/features/auth/tokens/token.schema.ts';

declare module 'socket.io' {
  interface Socket {
    user?: SafeUserPayload;
  }
}
