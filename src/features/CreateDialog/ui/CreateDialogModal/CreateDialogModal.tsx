import React, { FC } from 'react';

import { Modal } from 'shared/ui/Modal/ui/Modal';

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
    <Modal onClose={onClose} isOpened={isOpened}>
      <CreateDialogForm onClose={onClose} />
    </Modal>
  );
};
