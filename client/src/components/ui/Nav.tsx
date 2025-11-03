import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import type { ComponentProps, JSX, ReactNode } from 'react';
import { NavLink, type NavLinkProps } from 'react-router';
import { createComponent } from '../helper/createComponent';

type ButtonProps = ComponentProps<'button'>;

interface BaseNavProps {
  icon?: JSX.Element;
  label: string;
}

interface INavLinkProps extends BaseNavProps, NavLinkProps {}

interface INavButtonProps extends BaseNavProps, ButtonProps {}

const nav = cva(
  'inline-flex items-center gap-2 capitalize font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-400/20',
  {
    variants: {
      intent: {
        default: ' text-gray-600 hover:text-gray-900',
        active: ' text-indigo-500 hover:text-indigo-700',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  }
);

function NavItem({
  icon,
  label,
  children,
}: BaseNavProps & { children?: ReactNode }) {
  return (
    <>
      {icon && icon}
      {label && <span className="truncate">{label}</span>}
      {children}
    </>
  );
}

// Define Nav as a typed object with Link and Button properties
const Nav = {
  Link: createComponent({
    render: ({ icon, label, className, ...props }: INavLinkProps) => {
      return (
        <NavLink
          className={({ isActive }) =>
            cn(nav({ intent: isActive ? 'active' : 'default' }), className)
          }
          {...props}
        >
          <NavItem icon={icon} label={label} />
        </NavLink>
      );
    },
    displayName: 'Nav.Link',
  }),

  Button: createComponent({
    render: ({ icon, label, className, ...buttonProps }: INavButtonProps) => {
      return (
        <button
          className={cn(nav({ intent: 'default' }), className)}
          {...buttonProps}
        >
          <NavItem icon={icon} label={label} />
        </button>
      );
    },
    displayName: 'Nav.Button',
  }),
};

export { Nav };
