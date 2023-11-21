import clsx from 'classnames';
import React, {
  HTMLAttributes,
  HTMLInputTypeAttribute,
  forwardRef,
} from 'react';

import cls from './Input.module.scss';

interface InputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  name?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onAfterIconClick?: () => void;
  onBeforeIconClick?: () => void;
}

export const Input = forwardRef(
  (
    {
      className,
      onChange,
      value,
      type,
      after,
      before,
      name,
      onAfterIconClick,
      onBeforeIconClick,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement | null>
  ) => {
    return (
      <div className={cls.field}>
        <input
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
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
  }
);

Input.displayName = 'Input';
