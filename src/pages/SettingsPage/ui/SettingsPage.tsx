import cls from './SettingsPage.module.scss'
import React, { FC } from 'react'

interface SettingsPageProps {}

export const SettingsPage: FC<SettingsPageProps> = ({}) => {
  return (
    <div>
      <div className="page__header">123</div>
      <div className={cls.page__content}>
        <div className={cls.body}>
          <div className={cls.theme__card} />
          <div className={cls.theme__card} />
          <div className={cls.theme__card} />
          <div className={cls.theme__card} />
          <div className={cls.theme__card} />
        </div>
      </div>
    </div>
  )
}
