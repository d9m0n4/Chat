import cls from './Interlocutor.module.scss'
import React from 'react'
import { ReactComponent as Chevron } from 'shared/assets/icons/cheveron-down.svg'
import { Attach } from 'shared/ui/Attach'
import { Avatar } from 'shared/ui/Avatar'
import { Button } from 'shared/ui/Button'

export const Interlocutor = () => {
  return (
    <div className={cls.interlocutor}>
      <div className={cls.info}>
        <Avatar width={100} height={100} />
        <div className={cls.name}>Сократ Сократ</div>
        <span className={cls.isOnline}>в сети</span>
      </div>
      <div className={cls.attaches}>
        <div className={cls.attaches__heading}>
          <p>Вложения</p>
          <Button>
            <Chevron className={'icon'} />
          </Button>
        </div>
        <div className={cls.attaches__body}>
          <ul className={cls.attaches__list}>
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
            <Attach />
          </ul>
        </div>
      </div>
    </div>
  )
}
