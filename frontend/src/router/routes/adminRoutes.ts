import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router';

import LazyElement from '@/components/helpers/LazyElement';
import { Error } from '@/pages/errors/Errors';
import AdminGuard from '@/router/guard';

const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));

export const adminRoutes: RouteObject = {
  element: createElement(AdminGuard),
  errorElement: createElement(Error),
  children: [{ path: '/admin', element: LazyElement(Dashboard) }],
};
