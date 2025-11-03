import { createBrowserRouter, RouterProvider } from 'react-router';
import { guestUserRouter } from './GuestUserRouter';
import { authUserRouter } from './AuthUserRouter';
import MainLayout from '@/app/_layout';

// import Error from '@/app/errors/Error';
import Page404 from '@/app/Page404';
// import { PrivateGuard, PublicGuard } from './guards';
import { RootError } from '@/app/Error';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      guestUserRouter,
      authUserRouter,
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

export function RootRouter() {
  return <RouterProvider router={router} />;
}
