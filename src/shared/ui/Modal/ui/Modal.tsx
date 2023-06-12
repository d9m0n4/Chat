import cls from './Modal.module.scss'
import React, { FC, ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  onClose?: () => void
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={cls.modal}>
      <div className={cls.backdrop} onClick={onClose}></div>
      <div className={cls.modal__container}>
        <div className={cls.body}>{children}</div>
      </div>
    </div>
  )
}
