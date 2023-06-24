import cls from './Button.module.scss'
import clsx from 'classnames'
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react'

export enum ButtonVariants {
  EMPTY = 'empty',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  variant?: ButtonVariants
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  onClick,
  variant = ButtonVariants.EMPTY,
  ...props
}) => {
  return (
    <button className={clsx(cls.button, cls[variant], className)} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
