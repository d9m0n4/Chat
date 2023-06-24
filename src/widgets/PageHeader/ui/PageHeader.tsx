import cls from './PageHeader.module.scss'
import React, { FC, PropsWithChildren } from 'react'

export const PageHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div className={cls.page__header}>{children}</div>
}
