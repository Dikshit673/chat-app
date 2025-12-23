import { Suspense, type ComponentType } from 'react';

export const LazyElement = (Component: ComponentType) => (
  <Suspense fallback={<div className='p-4 text-center'>Loading...</div>}>
    <Component />
  </Suspense>
);

export default LazyElement;
