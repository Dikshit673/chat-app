import type { ComponentProps, JSX, ReactNode } from 'react';
import { NavLink, type NavLinkProps } from 'react-router';
import { tv } from 'tailwind-variants';

const navTV = tv({
  base: 'inline-flex items-center gap-2 capitalize font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ease-in-out active:scale-95  hover:bg-gray-400/20 border-0 cursor-pointer',
  variants: {
    intent: {
      default: 'text-text ',
      active: 'text-primary ',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

interface BaseNavProps {
  icon?: JSX.Element;
  label: string;
}

type INavItemProps = BaseNavProps & { children?: ReactNode };

function NavItem({ icon, label, children }: INavItemProps) {
  return (
    <>
      {icon && icon}
      {label && <span className='truncate'>{label}</span>}
      {children}
    </>
  );
}

type INavLinkProps = BaseNavProps & NavLinkProps;

const Link = ({ icon, label, className = '', ...props }: INavLinkProps) => {
  const linkClassName = typeof className === 'string' ? className : '';
  return (
    <NavLink
      className={({ isActive }) =>
        navTV({
          intent: isActive ? 'active' : 'default',
          className: linkClassName,
        })
      }
      {...props}
    >
      <NavItem icon={icon} label={label} />
    </NavLink>
  );
};

type INavButtonProps = ComponentProps<'button'> & BaseNavProps;

const Button = ({
  icon,
  label,
  className,
  ...buttonProps
}: INavButtonProps) => {
  return (
    <button
      className={navTV({ intent: 'default', className })}
      {...buttonProps}
    >
      <NavItem icon={icon} label={label} />
    </button>
  );
};

// Define Nav as a typed object with Link and Button properties
const Nav = {
  Link,
  Button,
};

export { Nav };
