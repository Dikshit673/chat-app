import { type UserId } from '@/features/user/domain/user.types.js';

import {
  type Conversation,
  type ConversationId,
} from '../../domain/conversation.types.js';

export interface ConversationRepo {
  create(conversation: Conversation): Promise<Conversation>;
  findById(id: ConversationId): Promise<Conversation | null>;
  findByUserId(userId: UserId): Promise<Conversation[]>;
}
