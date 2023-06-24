import cls from './Input.module.scss'
import clsx from 'classnames'
import React, { ChangeEvent, FC, HTMLAttributes } from 'react'

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  className?: string
  value?: string
  onChange?: (e: string) => void
}

export const Input: FC<InputProps> = ({ className, onChange, value, ...props }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }
  return (
    <input
      value={value}
      onChange={changeHandler}
      className={clsx(cls.input, className)}
      {...props}
    />
  )
}
