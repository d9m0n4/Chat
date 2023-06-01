import cls from './Online.module.scss'
import React, { FC } from 'react'

interface OnlineProps {
  className?: string
}

export const Online: FC<OnlineProps> = ({ className }) => {
  return <span className={`${cls.online} ${className}`}></span>
}
