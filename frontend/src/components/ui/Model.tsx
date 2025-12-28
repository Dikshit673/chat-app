import type {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from 'tailwind-variants';

type ModelProps = ComponentProps<'div'> & {
  id: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Model = ({
  id,
  children,
  isOpen,
  setIsOpen: _,
  className,
  ...props
}: ModelProps) => {
  return (
    isOpen &&
    createPortal(
      <div className={cn('absolute top-1 right-0 z-50', className)} {...props}>
        {children}
      </div>,
      document.getElementById(id)!
    )
  );
};
