import { AlignJustify, LogOutIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { AvatarPresenter, Card, Nav } from '@/components/ui';
import { logout } from '@/features/auth/authThunks';

import { NAVBAR_PORTAL_ID, NavigationLinks } from './components/NavigationData';
import { NavLogo } from './components/NavLogo';
import { NavMenu } from './components/NavMenu';
import { NavModel } from './components/NavModel';
import { ThemeToggleButton } from './components/ThemeToggleButton';

// =============================== Navbar ===============================
export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = useMemo(() => {
    if (!isAuth) {
      const guestLinks = NavigationLinks.filter((link) => !link.auth);
      return guestLinks;
    }
    const authLinks = NavigationLinks.filter((link) => link.auth);
    return authLinks;
  }, [isAuth]);

  const handleLogout = useCallback(() => {
    console.log('Logging out...');
    setIsMenuOpen(false);
    // TODO: clear auth token, redirect, or call API
    dispatch(logout()).then(() => {
      toast.success('Logged out successfully');
      navigate('/login');
    });
  }, [dispatch, navigate]);

  return (
    <header id='navbar' className='h-16'>
      <Card className='mx-auto flex size-full w-9/10 flex-row items-center justify-between pr-2 pl-6 text-black transition-transform duration-300 ease-in-out md:w-96/100'>
        <NavLogo />
        <div className='inline-flex items-center gap-2'>
          <NavMenu
            menuLinks={menuLinks}
            handleNavListClick={() => setIsMenuOpen((prev) => !prev)}
            screen='desktop'
          />

          {isAuth && (
            <AvatarPresenter
              size={'sm'}
              fallback='abcj dksj'
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />
          )}
          <ThemeToggleButton />
          <Nav.Button
            icon={<AlignJustify />}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            label=''
            className='px-3 md:hidden'
          />
        </div>
      </Card>
      <div id={NAVBAR_PORTAL_ID} className='relative'></div>
      <NavModel isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
        <Card>
          <NavMenu
            menuLinks={menuLinks}
            handleNavListClick={() => setIsMenuOpen(false)}
            screen='mobile'
          />
        </Card>
      </NavModel>
      {isAuth && (
        <NavModel isOpen={isProfileOpen} setIsOpen={setIsProfileOpen}>
          <Card className='flex flex-col items-center pt-2'>
            <AvatarPresenter size={'lg'} fallback='abcj dksj' />
            <p className='text-center'>John Doe</p>
            <Nav.Button
              icon={<LogOutIcon />}
              onClick={handleLogout}
              label='Logout'
            />
          </Card>
        </NavModel>
      )}
    </header>
  );
};
