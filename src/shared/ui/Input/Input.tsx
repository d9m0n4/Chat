import clsx from 'classnames';
import React, { FC, HTMLAttributes, HTMLInputTypeAttribute } from 'react';

import cls from './Input.module.scss';

interface InputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  className?: string;
  value?: string;
  onChange?: (e: string) => void;
  type?: HTMLInputTypeAttribute;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onAfterIconClick?: () => void;
  onBeforeIconClick?: () => void;
}

export const Input: FC<InputProps> = ({
  className,
  onChange,
  value,
  type,
  after,
  before,
  onAfterIconClick,
  onBeforeIconClick,
  ...props
}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div className={cls.field}>
      <input
        value={value}
        onChange={changeHandler}
        className={clsx(cls.field__input, className)}
        type={type}
        {...props}
      />
      {before && (
        <i className={cls.field__before} onClick={onBeforeIconClick}>
          {before}
        </i>
      )}
      {after && (
        <i className={cls.field__after} onClick={onAfterIconClick}>
          {after}
        </i>
      )}
    </div>
  );
};
