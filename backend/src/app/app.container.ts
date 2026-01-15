import { buildAuthModule } from '@/features/auth/auth.container.js';
import { buildUserModule } from '@/features/user/user.container.js';

// app/container.ts
export function buildContainer() {
  // build base modules
  const userModule = buildUserModule();

  // build dependent modules
  const authModule = buildAuthModule({
    userRepo: userModule.userRepo,
  });

  return {
    // user: userModule,
    auth: authModule,
  };
}
