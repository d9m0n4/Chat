import { Portal } from '../../../../shared/ui/Portal'
import { AddDialogForm } from '../AddDialogForm/AddDialogForm'
import React, { FC } from 'react'
import { Modal } from 'shared/ui/Modal/ui/Modal'

interface AddDialogModalProps {
  onClose: () => void
    isOpened: boolean
}

export const AddDialogModal: FC<AddDialogModalProps> = ({ onClose, isOpened }) => {
  return (
    <Portal>
      <Modal onClose={onClose} isOpened={isOpened}>
        <AddDialogForm />
      </Modal>
    </Portal>
  )
}
