import { Model } from '@/components/ui';
import { NAVBAR_PORTAL_ID } from './NavigationData';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavModel = ({ children, isOpen, setIsOpen }: Props) => {
  return (
    <Model id={NAVBAR_PORTAL_ID} isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
    </Model>
  );
};
