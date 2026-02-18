import { type ConversationId } from '@/features/conversation/domain/conversation.types.js';
import { type UserId } from '@/features/user/domain/user.types.js';

import { type Message, type MessageId } from '../../domain/message.types.js';

export interface MessageRepo {
  create(message: Message): Promise<Message>;
  findByConversationId(
    conversationId: ConversationId,
    limit: number,
    cursor?: Date
  ): Promise<Message[]>;

  markAsSeen(messageId: MessageId, userId: UserId): Promise<void>;
}
