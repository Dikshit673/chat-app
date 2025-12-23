import { BookPlus, LogIn, MessageCircle, UserCheck2 } from 'lucide-react';

export const NAVBAR_PORTAL_ID = 'navbar-portal';

export const NavigationLinks = [
  { to: '/login', icon: <LogIn />, label: 'login', auth: false },
  { to: '/signup', icon: <BookPlus />, label: 'signup', auth: false },
  { to: '/chats', icon: <MessageCircle />, label: 'chats', auth: true },
  { to: '/profile', icon: <UserCheck2 />, label: 'profile', auth: true },
];
