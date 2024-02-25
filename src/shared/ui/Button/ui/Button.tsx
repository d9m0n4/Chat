import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

import clsx from 'classnames';

import cls from './Button.module.scss';

export enum ButtonVariants {
  EMPTY = 'empty',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: ButtonVariants;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  onClick,
  variant = ButtonVariants.EMPTY,
  type,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(cls.button, cls[variant], className)}
      onClick={onClick}
      {...props}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
