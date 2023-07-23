import clsx from 'classnames';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

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
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  onClick,
  variant = ButtonVariants.EMPTY,
  type,
  ...props
}) => {
  return (
    <button
      className={clsx(cls.button, cls[variant], className)}
      onClick={onClick}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
};
