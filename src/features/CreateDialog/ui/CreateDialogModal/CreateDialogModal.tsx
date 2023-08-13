import React, { FC } from 'react';
import { socket } from 'shared/config/api/ws';
import { Modal } from 'shared/ui/Modal/ui/Modal';
import { Portal } from 'shared/ui/Portal';

import { CreateDialogForm } from '../CreateDialogForm/CreateDialogForm';

interface AddDialogModalProps {
  onClose: () => void;
  isOpened: boolean;
}

export const CreateDialogModal: FC<AddDialogModalProps> = ({
  onClose,
  isOpened,
}) => {
  return (
    <Portal>
      <Modal onClose={onClose} isOpened={isOpened}>
        <CreateDialogForm onClose={onClose} />
      </Modal>
    </Portal>
  );
};
