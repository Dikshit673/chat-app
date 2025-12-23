import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const inputSlotTV = tv({
  slots: {
    wrapper: 'flex w-full flex-col gap-2',
    label: 'text-sm font-semibold',
    input:
      'rounded-lg flex-1 border border-border focus:border-gray-300 focus:outline-primary px-3 py-1',
  },
  variants: {
    size: {
      sm: { wrapper: 'gap-1', label: 'text-xs', input: 'text-xs' },
      md: { wrapper: 'gap-2', label: 'text-sm', input: 'text-sm' },
      lg: { wrapper: 'gap-3', label: 'text-base', input: 'text-base' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const { wrapper: wrapperTV, label: labelTV, input: InputTV } = inputSlotTV();

type VariantType = VariantProps<typeof inputSlotTV>;

type InputProps = ComponentProps<'input'> & {
  label: string;
  inputSize?: VariantType['size'];
};

export const Input = ({
  id = 'input',
  name = 'input-name',
  label,
  inputSize: size,
  onChange,
  ...props
}: InputProps) => (
  <div className={wrapperTV({ size })}>
    {label && (
      <label htmlFor={id} className={labelTV({ size })}>
        {label}
      </label>
    )}
    <input
      {...props}
      id={id}
      name={name}
      onChange={onChange}
      className={InputTV({ size })}
    />
  </div>
);
