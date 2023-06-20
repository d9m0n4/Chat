import { DialogItem } from '../DialogItem/DialogItem'
import cls from './DialogList.module.scss'
import React from 'react'

export const DialogList = () => {
  return (
    <ul className={cls.list}>
      <DialogItem />
      <DialogItem />
      <DialogItem isActive />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
    </ul>
  )
}
