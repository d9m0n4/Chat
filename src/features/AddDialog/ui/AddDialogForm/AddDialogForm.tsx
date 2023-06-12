import cls from './AddDialogForm.module.scss'
import React, { FC } from 'react'
import { ReactComponent as Close } from 'shared/assets/icons/x-circle.svg'
import { Button } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input/Input'

interface AddDialogFormProps {}

export const AddDialogForm: FC<AddDialogFormProps> = () => {
  return (
    <div className={cls.form}>
      <div className={cls.heading}>
        <div className={cls.title}>Поиск собеседника</div>
        <Button onClick={() => console.log(123)}>
          <Close className="icon" />
        </Button>
      </div>
      <div className={cls.search}>
        <Input placeholder={'Введите имя собеседника'} />
      </div>
      <div className={cls.body}>123</div>
      <div className={cls.footer}>321</div>
    </div>
  )
}
