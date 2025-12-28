import { createElement } from 'react';
import { createBrowserRouter } from 'react-router';

import RootLayout from '@/layouts/RootLayout';
import { RootError } from '@/pages/errors/Errors';

import { adminRoutes } from './routes/adminRoutes';
import { notFoundRoutes } from './routes/notFoundRoutes';
import { userPrivateRoutes, userPublicRoutes } from './routes/userRoutes';

export const rootRouter = createBrowserRouter([
  {
    element: createElement(RootLayout),
    errorElement: createElement(RootError),
    children: [
      userPublicRoutes,
      userPrivateRoutes,
      adminRoutes,
      notFoundRoutes,
    ],
  },
]);
