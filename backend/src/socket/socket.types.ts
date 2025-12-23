import { SafeUserObject } from '@/models/user.model.js';

declare module 'socket.io' {
  interface Socket {
    user?: SafeUserObject;
  }
}

/* ===== In-memory stores ===== */
export type OnlineUsersMap = Map<string, string>;
// userId -> socketId (simple version)

/* ===== Payloads ===== */

export interface SendMessagePayload {
  recieverId: string;
  text: string;
}

export interface ReadMessagePayload {
  messageIds: string[];
}

export interface UpdateMessagePayload {
  messageId: string;
  text: string;
}

export interface DeleteMessagePayload {
  messageId: string;
}
