import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonTV = tv({
  base: 'inline-flex justify-center items-center  rounded-lg text-center uppercase transition-all duration-400 ease-in-out hover:scale-103 active:scale-95',
  variants: {
    intent: {
      primary:
        'bg-primary/80 hover:bg-primary active:bg-primary/80 text-white-100 shadow hover:shadow-md shadow-primary/50',
      secondary:
        'bg-secondary hover:bg-secondary/95 active:bg-secondary/90 text-card',
      ghost:
        'bg-transparent hover:bg-gray-400/20 active:bg-gray-400/30 text-primary',
      icon: 'bg-transparent hover:bg-primary/10 active:bg-primary/20 text-primary hover:shadow-lg',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-2.5',
      xl: 'text-xl px-6 py-3',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

type Props = ComponentProps<'button'> & VariantProps<typeof buttonTV>;

export const Button = ({
  children,
  className,
  intent,
  size,
  fullWidth,
  ...props
}: Props) => (
  <button
    {...props}
    className={buttonTV({ intent, size, fullWidth, className })}
  >
    {children}
  </button>
);
