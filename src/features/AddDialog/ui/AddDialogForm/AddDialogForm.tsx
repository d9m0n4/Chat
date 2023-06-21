import { Avatar } from '../../../../shared/ui/Avatar'
import cls from './AddDialogForm.module.scss'
import React, { FC } from 'react'
import { ReactComponent as Close } from 'shared/assets/icons/x.svg'
import { Button } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input/Input'

interface AddDialogFormProps {
  onClose: () => void
}

export const AddDialogForm: FC<AddDialogFormProps> = ({ onClose }) => {
  return (
    <div className={cls.form}>
      <div className={cls.heading}>
        <div className={cls.title}>Поиск собеседника</div>
        <Button onClick={onClose}>
          <Close className="icon" />
        </Button>
      </div>
      <div className={cls.search}>
        <Input placeholder={'Введите имя собеседника'} className={cls.search__field} />
      </div>
      <div className={cls.body}>
        <ul className={cls.list}>
          <li className={cls.list__item}>
            <div className={cls.wrapper}>
              <div className={cls.user}>
                <Avatar width={40} height={40} />
                <div className={cls.name}>Александр Пушкин</div>
              </div>
              <div className={cls.info}>
                <div className={cls.status}>онлайн</div>
                <Button className={cls.button}> {'Написать'} </Button>
              </div>
            </div>
          </li>
          <li className={cls.list__item}>
            <div className={cls.wrapper}>
              <div className={cls.user}>
                <Avatar width={40} height={40} />
                <div className={cls.name}>Александр Пушкин</div>
              </div>
              <div className={cls.info}>
                <div className={cls.status}>онлайн</div>
                <Button className={cls.button}> {'Написать'} </Button>
              </div>
            </div>
          </li>
          <li className={cls.list__item}>
            <div className={cls.wrapper}>
              <div className={cls.user}>
                <Avatar width={40} height={40} />
                <div className={cls.name}>Пушкин</div>
              </div>
              <div className={cls.info}>
                <div className={cls.status}>онлайн</div>
                <Button className={cls.button}> {'Написать'} </Button>
              </div>
            </div>
          </li>
          <li className={cls.list__item}>
            <div className={cls.wrapper}>
              <div className={cls.user}>
                <Avatar width={40} height={40} />
                <div className={cls.name}>Александр Пушкин </div>
              </div>
              <div className={cls.info}>
                <div className={cls.status}>онлайн</div>
                <Button className={cls.button}> {'Написать'} </Button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className={cls.footer}></div>
    </div>
  )
}
