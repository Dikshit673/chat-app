import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';

import { Card } from '@/components/ui';
import AuthLayout from '@/app/auth/_layout';

import AuthError from '@/app/errors/AuthError';
import ProfileError from '@/app/errors/ProfileError';
import MessageError from '@/app/errors/MessageError';

const Chat = lazy(() => import('@/app/auth/Chat'));

// change name to app router
export const authUserRouter: RouteObject = {
  element: <AuthLayout />,
  errorElement: <AuthError />,
  children: [
    {
      path: '/profile',
      errorElement: <ProfileError />,
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <Card className="h-full w-full">
            <div className="p-6">Profile</div>
          </Card>
        </Suspense>
      ),
    },
    {
      path: '/messages',
      errorElement: <MessageError />,
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <Chat />
        </Suspense>
      ),
    },
  ],
};
