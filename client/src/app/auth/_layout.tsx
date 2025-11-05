import { Outlet } from 'react-router';

import Sidebar from '@/features/contacts/components/Sidebar';

function AuthLayout() {
  return (
    <div className="grid h-full w-full grid-cols-[240px_1fr] gap-4 transition-all duration-150 ease-in-out md:grid-cols-[300px_1fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
