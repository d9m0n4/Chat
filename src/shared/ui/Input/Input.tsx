import React, {
  HTMLAttributes,
  HTMLInputTypeAttribute,
  forwardRef,
} from 'react';

import clsx from 'classnames';

import cls from './Input.module.scss';

interface InputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  inputClassName?: string;
  containerClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disable?: boolean;
  type?: HTMLInputTypeAttribute;
  name?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onAfterIconClick?: () => void;
  onBeforeIconClick?: () => void;
  placeholder: string;
}

export const Input = forwardRef(
  (
    {
      inputClassName,
      containerClassName,
      onChange,
      value,
      type,
      required,
      disable,
      after,
      before,
      name,
      onAfterIconClick,
      onBeforeIconClick,
      placeholder,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement | null>
  ) => {
    return (
      <div className={clsx(cls.field, containerClassName)}>
        <input
          ref={ref}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          disabled={disable}
          className={clsx(cls.field__input, inputClassName)}
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
