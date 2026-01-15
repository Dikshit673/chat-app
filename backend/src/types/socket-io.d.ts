import { SafeJwtUserPayload } from '@/features/auth/auth.types.ts';

declare module 'socket.io' {
  interface Socket {
    user?: SafeJwtUserPayload;
  }
}
