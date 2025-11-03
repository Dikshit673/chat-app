import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const heading = cva('capitalize', {
  variants: {
    as: {
      h1: 'text-6xl font-extrabold',
      h2: 'text-4xl font-extrabold',
      h3: 'text-3xl font-bold',
      h4: 'text-2xl font-bold',
      h5: 'text-xl font-semibold',
      h6: 'text-base font-semibold',
    },
    color: {
      primary: 'text-black',
      secondary: 'text-gray-600',
    },
  },
  defaultVariants: {
    as: 'h1',
    color: 'primary',
  },
});

type HeadingProps = {
  title: string;
  className?: string;
  color?: VariantProps<typeof heading>['color'];
};

type HeadingElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

function createHeading(as: HeadingElementType) {
  return ({ title, color = 'primary', className = '' }: HeadingProps) => {
    const Tag = as;
    return <Tag className={cn(heading({ as, color }), className)}>{title}</Tag>;
  };
}

const Heading = {
  H1: createHeading('h1'),
  H2: createHeading('h2'),
  H3: createHeading('h3'),
  H4: createHeading('h4'),
  H5: createHeading('h5'),
  H6: createHeading('h6'),
};

export { Heading };
