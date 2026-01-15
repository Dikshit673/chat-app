import type { UserId } from '@/features/user/user.types.js';
import { userIdSchema } from '@/features/user/user.validation.schema.js';
import { ConversationModel } from '@/models/conversation.model.js';

import type { ConversationRepository } from './conversation.repository.js';
import type { Conversation, ConversationId } from './conversation.types.js';
import { conversationIdSchema } from './conversation.validation.schema.js';

export class ConversationRepositoryMongo implements ConversationRepository {
  async create(conversation: Conversation): Promise<Conversation> {
    const doc = await ConversationModel.create({
      participants: conversation.participants,
      isGroup: conversation.isGroup,
    });
    const id = conversationIdSchema.parse(doc._id.toString());
    const participants = doc.participants.map((value) =>
      userIdSchema.parse(value.toString())
    );

    return {
      id,
      participants,
      isGroup: doc.isGroup ?? false,
      createdAt: doc.createdAt,
    };
  }

  async findById(conversationId: ConversationId): Promise<Conversation | null> {
    const doc = await ConversationModel.findById(conversationId).lean();
    if (!doc) return null;
    const id = conversationIdSchema.parse(doc._id.toString());
    const participants = doc.participants.map((value) =>
      userIdSchema.parse(value.toString())
    );

    return {
      id,
      participants,
      isGroup: doc.isGroup ?? false,
      createdAt: doc.createdAt,
    };
  }

  async findByUserId(userId: UserId): Promise<Conversation[]> {
    const docs = await ConversationModel.find({
      participants: userId,
    }).lean();

    return docs.map((doc) => {
      const id = conversationIdSchema.parse(doc._id.toString());
      const participants = doc.participants.map((value) =>
        userIdSchema.parse(value.toString())
      );

      return {
        id,
        participants,
        isGroup: doc.isGroup ?? false,
        createdAt: doc.createdAt,
      };
    });
  }
}
