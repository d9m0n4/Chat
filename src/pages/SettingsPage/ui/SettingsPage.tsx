import cls from './SettingsPage.module.scss'
import { ThemeCard } from 'features/ChangeTheme'
import React, { FC } from 'react'

interface SettingsPageProps {}

export const SettingsPage: FC<SettingsPageProps> = ({}) => {
  return (
    <div className={cls.page__content}>
      <div className={cls.body}>
        <ThemeCard themeName="w" />
      </div>
    </div>
  )
}
