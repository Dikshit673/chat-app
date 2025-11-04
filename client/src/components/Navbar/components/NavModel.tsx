import { Model } from '@/components/ui';
import { NAVBAR_PORTAL_ID } from '../Navbar';

export const NavModel = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Model id={NAVBAR_PORTAL_ID} isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
    </Model>
  );
};
