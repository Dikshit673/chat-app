import type { ConversationId } from '@/modules/conversation/conversation.types.js';
import type { UserId } from '@/modules/user/user.types.js';

import type { Message, MessageId } from './message.types.js';

export interface MessageRepository {
  create(message: Message): Promise<Message>;
  findByConversationId(
    conversationId: ConversationId,
    limit: number,
    cursor?: Date
  ): Promise<Message[]>;

  markAsSeen(messageId: MessageId, userId: UserId): Promise<void>;
}
