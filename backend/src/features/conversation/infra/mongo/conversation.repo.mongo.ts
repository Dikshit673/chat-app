import {
  ConversationModel,
  type IConversationDocument,
} from '@/application/db/mongo/models/conversation.model.js';
import { type UserId } from '@/features/user/domain/user.types.js';
import { parseAsUserId } from '@/features/user/infra/mongo/parseAsUserId.js';

import {
  type Conversation,
  type ConversationId,
} from '../../domain/conversation.types.js';
import { type ConversationRepo } from '../interface/conversation.repo.js';
import { parseAsConversationId } from './pasreAsConversationId.js';

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
      id: parseAsConversationId(doc._id),
      participants: doc.participants.map((value) => parseAsUserId(value)),
      isGroup: doc.isGroup ?? false,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
