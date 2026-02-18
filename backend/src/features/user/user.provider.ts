import { container } from '@/application/express/domain/app.container.js';
import { UserRepoMongo } from '@/features/user/infra/mongo/user.repo.mongo.js';

export const userRepo = () =>
  container.singleton('UserRepo', () => new UserRepoMongo());
