import { BookPlus, LogIn, MessageCircle, UserCheck2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

import { Nav } from '@/components/ui';

const NavigationLinks = [
  { to: '/login', icon: <LogIn />, label: 'login', auth: false },
  { to: '/signup', icon: <BookPlus />, label: 'signup', auth: false },
  { to: '/chats', icon: <MessageCircle />, label: 'chats', auth: true },
  { to: '/profile', icon: <UserCheck2 />, label: 'profile', auth: true },
];

const navMenuCVA = cva('', {
  variants: {
    screen: {
      mobile:
        ' flex w-min flex-col space-y-2 rounded-lg bg-white shadow-md md:hidden',
      desktop: 'hidden md:flex md:items-center md:space-x-6',
    },
  },
});

interface NavMenuListPresenterProps {
  menuLinks: typeof NavigationLinks;
}

const NavMenuListPresenter = ({ menuLinks }: NavMenuListPresenterProps) => {
  return menuLinks.map((link, index) => {
    return (
      <Nav.Link key={index} to={link.to} icon={link.icon} label={link.label} />
    );
  });
};

type NavigationMenuProps = VariantProps<typeof navMenuCVA> & {
  menuLinks: typeof NavigationLinks;
  handleNavListClick?: () => void;
};

export const NavMenu = ({
  screen = 'desktop',
  menuLinks,
  handleNavListClick,
}: NavigationMenuProps) => {
  return (
    <nav className={cn(navMenuCVA({ screen }))} onClick={handleNavListClick}>
      <NavMenuListPresenter menuLinks={menuLinks} />
    </nav>
  );
};
