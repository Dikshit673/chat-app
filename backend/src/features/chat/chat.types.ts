import { type ConversationId } from '@/features/conversation/domain/conversation.types.js';
import { type UserId } from '@/features/user/domain/user.types.js';
import { type Brand } from '@/types/brand.js';

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
