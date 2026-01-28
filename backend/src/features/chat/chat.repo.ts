// import type { ConversationId } from '@/features/conversation/conversation.types.js';
// import type { UserId } from '@/features/user/user.types.js';

import type { Chat, ChatId as _ } from './chat.types.js';

export interface ChatRepo {
  create(): Promise<Chat>;
  findByConversationId(): Promise<Chat[]>;

  markAsSeen(): Promise<void>;
}
