import React, { FC } from 'react';
import { Modal } from 'shared/ui/Modal/ui/Modal';
import { Portal } from 'shared/ui/Portal';

import { AddDialogForm } from '../AddDialogForm/AddDialogForm';

interface AddDialogModalProps {
  onClose: () => void;
  isOpened: boolean;
}

export const AddDialogModal: FC<AddDialogModalProps> = ({ onClose, isOpened }) => {
  return (
    <Portal>
      <Modal onClose={onClose} isOpened={isOpened}>
        <AddDialogForm onClose={onClose} />
      </Modal>
    </Portal>
  );
};
