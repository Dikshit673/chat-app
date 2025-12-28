import { lazy } from 'react';
import type { RouteObject } from 'react-router';

import LazyElement from '@/components/helpers/LazyElement';

const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));

export const notFoundRoutes: RouteObject = {
  path: '*',
  element: LazyElement(NotFoundPage),
};
