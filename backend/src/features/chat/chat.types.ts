import type { ConversationId } from '@/features/conversation/conversation.types.js';
import type { UserId } from '@/features/user/user.types.js';
import type { Brand } from '@/types/brand.js';

export type ChatId = Brand<string, 'chatId'>;

export interface Chat {
  id: ChatId;
  conversationId: ConversationId;
  senderId: UserId;
  text: string;
  seenBy: string[];
  createdAt: Date;
  updatedAt: Date;
}
