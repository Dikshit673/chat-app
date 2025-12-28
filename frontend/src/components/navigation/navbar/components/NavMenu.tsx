import { tv, type VariantProps } from 'tailwind-variants';

import { Nav } from '@/components/ui';

import { NavigationLinks } from './NavigationData';

const menuTV = tv({
  base: '',
  variants: {
    screen: {
      mobile:
        ' flex w-min flex-col space-y-2 rounded-lg bg-card shadow-md md:hidden',
      desktop: 'hidden md:flex md:items-center md:space-x-6',
    },
  },
});

type NavigationMenuProps = VariantProps<typeof menuTV> & {
  menuLinks: typeof NavigationLinks;
  handleNavListClick?: () => void;
};

export const NavMenu = ({
  screen = 'desktop',
  menuLinks,
  handleNavListClick,
}: NavigationMenuProps) => (
  <nav className={menuTV({ screen })} onClick={handleNavListClick}>
    {menuLinks.map((link, index) => {
      return (
        <Nav.Link
          key={index}
          to={link.to}
          icon={link.icon}
          label={link.label}
        />
      );
    })}
  </nav>
);
