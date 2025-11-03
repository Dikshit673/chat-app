import type { ComponentType, JSX } from 'react';

type CreateComponentOptions<T> = {
  render: (props: T) => JSX.Element;
  displayName?: string;
};

export function createComponent<T>({
  render,
  displayName,
}: CreateComponentOptions<T>): ComponentType<T> {
  const Component = (props: T) => render(props);
  Component.displayName = displayName ?? 'AnonymousComponent';
  return Component;
}
