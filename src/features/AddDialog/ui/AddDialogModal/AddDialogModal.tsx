import { Portal } from '../../../../shared/ui/Portal'
import { AddDialogForm } from '../AddDialogForm/AddDialogForm'
import React, { FC } from 'react'
import { Modal } from 'shared/ui/Modal/ui/Modal'

interface AddDialogModalProps {
  onClose: () => void
}

export const AddDialogModal: FC<AddDialogModalProps> = ({ onClose }) => {
  return (
    <Portal>
      <Modal onClose={onClose}>
        <AddDialogForm />
      </Modal>
    </Portal>
  )
}
