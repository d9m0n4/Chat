import cls from './Avatar.module.scss'
import React, { FC, HTMLAttributes } from 'react'
import img from 'shared/assets/icons/Ellipse.png'

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  src?: string,
  width?: number,
  height?: number
}

export const Avatar: FC<AvatarProps> = ({ src, height = 48, width = 48 }) => {
  return <div className={cls.avatar}>{<img src={img} width={width} height={height} alt="avatar" />}</div>
}
