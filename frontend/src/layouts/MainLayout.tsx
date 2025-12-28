import { Outlet } from 'react-router';

import { Sidebar } from '@/components/navigation/sidebar';
import { Card } from '@/components/ui';

const MainLayout = () => {
  return (
    <main className='size-full overflow-hidden'>
      <div className='mx-auto grid h-full w-9/10 grid-cols-[auto_1fr] gap-4 transition-all duration-300 ease-in-out md:w-96/100'>
        <Sidebar />
        <Card className='h-full overflow-hidden p-0'>
          <Outlet />
        </Card>
      </div>
    </main>
  );
};

export default MainLayout;
