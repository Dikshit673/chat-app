import {
  AlignJustify,
  BookPlus,
  LogIn,
  LogOutIcon,
  MessageCircle,
  UserCheck2,
} from 'lucide-react';
import { AvatarPresenter, Card, Nav } from '../ui';
import { NavLogo } from './components/NavLogo';
import { NavMenu } from './components/NavMenu';
import { useCallback, useMemo, useState } from 'react';
import { NavModel } from './components/NavModel';

export const NAVBAR_PORTAL_ID = 'navbar-portal';

const NavigationLinks = [
  { to: '/login', icon: <LogIn />, label: 'login', auth: false },
  { to: '/signup', icon: <BookPlus />, label: 'signup', auth: false },
  { to: '/chats', icon: <MessageCircle />, label: 'chats', auth: true },
  { to: '/profile', icon: <UserCheck2 />, label: 'profile', auth: true },
];

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
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
  }, []);

  return (
    <header className="bg-prime-300 h-15 px-2 pt-4">
      <Card className="flex h-full flex-row items-center justify-between py-0 pr-2 pl-6 text-black">
        <NavLogo onClick={() => setIsAuth((prev) => !prev)} />
        <div className="inline-flex items-center gap-2">
          <NavMenu
            menuLinks={menuLinks}
            handleNavListClick={() => setIsMenuOpen((prev) => !prev)}
            screen="desktop"
          />

          {isAuth && (
            <AvatarPresenter
              size={'sm'}
              fallback="abcj dksj"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />
          )}
          <Nav.Button
            icon={<AlignJustify />}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            label=""
            className="px-3 md:hidden"
          />
        </div>
      </Card>
      <div id={NAVBAR_PORTAL_ID} className="relative"></div>
      <NavModel isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
        <NavMenu
          menuLinks={menuLinks}
          handleNavListClick={() => {}}
          screen="mobile"
        />
      </NavModel>
      {isAuth && (
        <NavModel isOpen={isProfileOpen} setIsOpen={setIsProfileOpen}>
          <Card className="gap-2 p-2">
            <AvatarPresenter size={'lg'} fallback="abcj dksj" />
            <p className="text-center">John Doe</p>
            <Nav.Button
              icon={<LogOutIcon />}
              onClick={handleLogout}
              label="Logout"
            />
          </Card>
        </NavModel>
      )}
    </header>
  );
};

export default Navbar;
