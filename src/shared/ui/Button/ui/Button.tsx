import cls from './Button.module.scss'
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button className={`${cls.button} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
