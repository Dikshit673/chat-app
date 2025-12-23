import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/app/hooks';

// admin
export default function AdminGuard() {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  return user?.role === 'admin' ? <Outlet /> : <Navigate to='/' replace />;
}

// user-public
export function UserPublicGuard() {
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  return isAuth ? <Navigate to='/' replace /> : <Outlet />;
}

// user-private
export function UserPrivateGuard() {
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to='/login' replace />;
}
