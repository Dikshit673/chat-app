import type { ConversationId } from '@/modules/conversation/conversation.types.js';
import type { UserId } from '@/modules/user/user.types.js';
import type { Brand } from '@/types/brand.js';

export type MessageId = Brand<string, 'MessageId'>;

export interface Message {
  id: MessageId;
  conversationId: ConversationId;
  senderId: UserId;
  text: string;
  createdAt: Date;
  seenBy: string[];
}
