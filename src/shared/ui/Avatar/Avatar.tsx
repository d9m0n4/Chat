import cls from './Avatar.module.scss'
import React, { FC, HTMLAttributes } from 'react'
import img from 'shared/assets/icons/Ellipse.png'

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  src?: string
}

export const Avatar: FC<AvatarProps> = ({ src }) => {
  return <div className={cls.avatar}>{<img src={img} width={48} height={48} alt="avatar" />}</div>
}
