import { container } from '@/application/express/domain/app.container.js';
import { authRouter } from '@/features/auth/index.js';

import { ApiRouter } from '../root/api/api.router.js';
import { V1Router } from '../root/api/v1/v1.router.js';
import { HomeRouter } from '../root/home/home.router.js';

const v1Router = () =>
  container.singleton('V1Router', () => new V1Router('/v1', [authRouter()]));

const apiRouter = () =>
  container.singleton('ApiRouter', () => new ApiRouter('/api', [v1Router()]));

const homeRouter = () =>
  container.singleton('HomeRouter', () => new HomeRouter('/'));

export const rootRouter = () =>
  container.singleton('RootRouter', () => [homeRouter(), apiRouter()]);
