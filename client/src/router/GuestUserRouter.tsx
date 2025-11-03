import type { RouteObject } from 'react-router';
import GuestLayout from '@/app/guest/_layout';

import Error from '@/app/errors/Error';
import Login from '@/app/guest/Login';
import Signup from '@/app/guest/Signup';

export const guestUserRouter: RouteObject = {
  element: <GuestLayout />,
  errorElement: <Error />,
  children: [
    { path: '/', element: <div>Home</div> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
  ],
};
