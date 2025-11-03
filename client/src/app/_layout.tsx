import { Outlet } from 'react-router';

import Navbar from '@/components/Navbar';

function MainLayout() {
  return (
    <div className="bg-prime-300 flex h-screen w-full flex-col overflow-hidden">
      <Navbar />
      <main className="flex flex-1 overflow-hidden p-4">
        <Outlet />
      </main>
      {/* <footer className="bg-gray-600 p-4 text-center text-white">
        © 2025 MyApp
      </footer> */}
    </div>
  );
}

export default MainLayout;
