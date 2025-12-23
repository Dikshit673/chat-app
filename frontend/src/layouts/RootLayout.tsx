import { Navbar } from '@/components/navigation/navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='bg-bg grid h-screen grid-cols-1 grid-rows-[auto_1fr] gap-4 *:first:pt-4 *:last:pb-4'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
