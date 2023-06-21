import cls from './Modal.module.scss'
import React, {FC, ReactNode, useCallback, useEffect} from 'react'

interface ModalProps {
  children: ReactNode
  onClose?: () => void
    isOpened: boolean
}

export const Modal: FC<ModalProps> = ({ children, onClose , isOpened}) => {
    const noClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (onClose) {
                onClose()
            }
        }
    }, [onClose])

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        };
    }, [onKeyDown]);

  return (
    <div className={`${cls.modal} ${isOpened ? cls.opened : ''}`} >
      <div className={cls.backdrop} onClick={onClose}/>
      <div className={cls.modal__container} onClick={noClick}>
          {children}
      </div>
    </div>
  )
}
