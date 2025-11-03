import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps } from 'react';

const button = cva('inline-block', {
  variants: {
    intent: {
      primary:
        ' rounded-md bg-indigo-500 text-white border border-indigo-600 capitalize shadow-lg transition-transform duration-75 ease-in-out hover:bg-indigo-700 active:scale-95',
      secondary: 'bg-gray-500',
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

interface ButtonProps extends ComponentProps<'button'> {
  label?: string;
  variant?: VariantProps<typeof button>['intent'];
  size?: VariantProps<typeof button>['size'];
  fullWidth?: VariantProps<typeof button>['fullWidth'];
}

const Button = ({
  label,
  children,
  variant,
  size,
  className,
  fullWidth,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(button({ intent: variant, size, fullWidth }), className)}
    >
      {label ? label : children}
    </button>
  );
};

Button.displayName = 'Button';

export { Button };
