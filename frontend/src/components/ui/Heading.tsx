// Heading.tsx
import type { ComponentPropsWithRef } from 'react';
import { memo } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const headingTV = tv({
  slots: {
    base: 'transition-all duration-300 ease-in-out',
    icon: 'inline-block mr-2',
  },

  variants: {
    size: {
      h1: 'text-4xl sm:text-5xl lg:text-6xl',
      h2: 'text-3xl sm:text-4xl lg:text-5xl',
      h3: 'text-2xl sm:text-3xl lg:text-4xl',
      h4: 'text-xl sm:text-2xl lg:text-3xl',
      h5: 'text-lg sm:text-xl',
      h6: 'text-base sm:text-lg',
    },

    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },

    tracking: {
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
    },

    leading: {
      none: 'leading-none',
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
    },

    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-gray-500',
      danger: 'text-red-600',
      white: 'text-white',
    },

    withIcon: {
      true: 'flex items-center',
      false: '',
    },
  },

  compoundVariants: [
    {
      size: 'h1',
      weight: 'bold',
      class: 'tracking-tight',
    },
    {
      size: 'h2',
      weight: 'semibold',
      class: 'tracking-tight',
    },
  ],

  defaultVariants: {
    size: 'h3',
    weight: 'semibold',
    tracking: 'tight',
    leading: 'tight',
    color: 'primary',
    withIcon: false,
  },
});

type HeadingTVProps = VariantProps<typeof headingTV>;

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = ComponentPropsWithRef<HeadingElement> &
  HeadingTVProps & {
    as?: HeadingElement; // semantic override
    icon?: React.ReactNode; // optional slot
    children: React.ReactNode;
  };

function createHeading(as: HeadingElement) {
  const Comp = memo(
    ({
      ref,
      size = as,
      weight,
      tracking,
      leading,
      color,
      withIcon,
      icon,
      className,
      children,
      as: override,
      ...props
    }: HeadingProps) => {
      const Tag = override ?? as;

      const { base: headingBase, icon: headingIcon } = headingTV({
        size,
        weight,
        tracking,
        leading,
        color,
        withIcon: !!icon,
      });

      return (
        <Tag ref={ref} className={headingBase({ className })} {...props}>
          {icon ? <span className={headingIcon()}>{icon}</span> : null}
          {children}
        </Tag>
      );
    }
  );

  Comp.displayName = `Heading.${as}`;
  return Comp;
}

const Heading = {
  H1: createHeading('h1'),
  H2: createHeading('h2'),
  H3: createHeading('h3'),
  H4: createHeading('h4'),
  H5: createHeading('h5'),
  H6: createHeading('h6'),
} as const;

export { Heading };

export type HeadingType = typeof Heading;
