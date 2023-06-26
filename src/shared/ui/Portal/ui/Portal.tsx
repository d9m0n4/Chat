import { FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactElement;
  container?: Element | DocumentFragment;
}

export const Portal: FC<PortalProps> = ({ children, container = document.body }) => {
  return createPortal(children, container);
};
