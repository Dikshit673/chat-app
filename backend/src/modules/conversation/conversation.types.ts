import type { UserId } from '@/modules/user/user.types.js';
import type { Brand } from '@/types/brand.js';

export type ConversationId = Brand<string, 'ConversationId'>;

export interface Conversation {
  id: ConversationId;
  participants: UserId[]; // userIds
  isGroup: boolean;
  createdAt: Date;
}
