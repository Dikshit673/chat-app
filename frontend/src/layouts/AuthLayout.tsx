import { Outlet } from 'react-router';

import { Card } from '@/components/ui';

const AuthLayout = () => {
  return (
    <main className='flex size-full flex-col items-center justify-center gap-2'>
      <Card className='w-[min(90%,25rem)] p-8'>
        <Outlet />
      </Card>
    </main>
  );
};

export default AuthLayout;
