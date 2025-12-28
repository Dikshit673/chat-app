/* @refresh reset */

import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router';

import LazyElement from '@/components/helpers/LazyElement';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { UserPrivateGuard, UserPublicGuard } from '@/router/guard';

const SignupPage = lazy(() => import('@/pages/auth/SignupPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const ChatHomePage = lazy(() => import('@/pages/chat/ChatHomePage'));
const ChatRoomPage = lazy(() => import('@/pages/chat/ChatRoomPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));

export const userPublicRoutes: RouteObject = {
  element: createElement(UserPublicGuard),
  children: [
    {
      element: createElement(AuthLayout),
      children: [
        { path: '/login', element: LazyElement(LoginPage) },
        { path: '/signup', element: LazyElement(SignupPage) },
      ],
    },
  ],
};

export const userPrivateRoutes: RouteObject = {
  element: createElement(UserPrivateGuard),
  children: [
    {
      element: createElement(MainLayout),
      children: [
        { path: '/', element: LazyElement(ChatHomePage) },
        { path: 'profile', element: LazyElement(ProfilePage) },
        { path: '/chats', element: LazyElement(ChatHomePage) },
        { path: '/chats/:chatId', element: LazyElement(ChatRoomPage) },
      ],
    },
  ],
};
