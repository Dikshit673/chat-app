import type { UserId } from '@/modules/user/user.types.js';

import type { Conversation, ConversationId } from './conversation.types.js';

export interface ConversationRepository {
  create(conversation: Conversation): Promise<Conversation>;
  findById(id: ConversationId): Promise<Conversation | null>;
  findByUserId(userId: UserId): Promise<Conversation[]>;
}
