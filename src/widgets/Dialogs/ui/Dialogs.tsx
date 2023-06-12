import cls from './Dialogs.module.scss'
import { DialogList } from 'entities/Dialog'
import { AddDialogModal } from 'features/AddDialog'
import React from 'react'
import { ReactComponent as Add } from 'shared/assets/icons/plus.svg'
import { Button } from 'shared/ui/Button'

export const Dialogs = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className={cls.dialogs}>
      <div>
        <div className={cls.title}>
          <p>Диалоги</p>
          <Button onClick={() => setIsOpen(true)}>
            <Add className="icon" />
          </Button>
        </div>
      </div>
      <div>
        <DialogList />
      </div>
      {isOpen && <AddDialogModal onClose={() => setIsOpen(false)} />}
    </div>
  )
}
