import type { UserId } from '@/features/user/user.types.js';
import {
  ConversationModel,
  IConversationDocument,
} from '@/infra/db/models/conversation.model.js';

import { objectIdParser } from '../shared/utils/objectId.parser.js';
import type { ConversationRepo } from './conversation.repo.js';
import type { Conversation, ConversationId } from './conversation.types.js';

export class ConversationRepoMongo implements ConversationRepo {
  async create(conversation: Conversation): Promise<Conversation> {
    const doc = await ConversationModel.create({
      participants: conversation.participants,
      isGroup: conversation.isGroup,
    });
    return this.mapConversationDoc(doc);
  }

  async findById(conversationId: ConversationId): Promise<Conversation | null> {
    const doc = await ConversationModel.findById(conversationId);
    if (!doc) return null;
    return this.mapConversationDoc(doc);
  }

  async findByUserId(userId: UserId): Promise<Conversation[]> {
    const docs = await ConversationModel.find({
      participants: userId,
    });

    return docs.map((doc) => this.mapConversationDoc(doc));
  }

  private mapConversationDoc(doc: IConversationDocument): Conversation {
    return Object.freeze({
      id: objectIdParser.asConversationId(doc._id),
      participants: doc.participants.map((value) =>
        objectIdParser.asUserId(value)
      ),
      isGroup: doc.isGroup ?? false,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
