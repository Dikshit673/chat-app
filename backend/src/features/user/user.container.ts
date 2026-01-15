import { UserRepositoryMongo } from './user.repository.mongo.js';

// modules/user/user.container.ts
export function buildUserModule() {
  const userRepo = new UserRepositoryMongo();
  //   const userService = new UserService(userRepo);

  return {
    userRepo,
    // userService,
  };
}
