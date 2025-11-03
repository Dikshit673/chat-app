import { Outlet } from 'react-router';

function GuestLayout() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex flex-1 p-6">
        <Outlet />
      </div>
    </section>
  );
}

export default GuestLayout;
