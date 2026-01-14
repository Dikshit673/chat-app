import { SafeJwtUserPayload } from '@/modules/auth/auth.types.ts';

declare module 'socket.io' {
  interface Socket {
    user?: SafeJwtUserPayload;
  }
}
