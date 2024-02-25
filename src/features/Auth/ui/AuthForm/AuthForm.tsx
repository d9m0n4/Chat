import React, { FC, useEffect, useState } from 'react';
import {
  Controller,
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'classnames';
import { ReactComponent as Arrow } from 'shared/assets/icons/arrowR.svg';
import { ReactComponent as EyeOff } from 'shared/assets/icons/eye-off.svg';
import { ReactComponent as Eye } from 'shared/assets/icons/eye.svg';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { ObjectSchema } from 'yup';

import cls from './AuthForm.module.scss';

interface AuthFormProps<T extends FieldValues> {
  onSubmitForm: SubmitHandler<T>;
  schema: ObjectSchema<T>;
  fields: Array<{ name: string; placeholder: string; type?: string }>;
}

export const AuthForm: FC<AuthFormProps<FieldValues>> = ({
  onSubmitForm,
  schema,
  fields,
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<FieldValues>({ mode: 'onChange', resolver: yupResolver(schema) });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form className={cls.form} onSubmit={handleSubmit(onSubmitForm)}>
      {fields.map((propsField, index) => (
        <div key={index} className={cls['form__input-control']}>
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                inputClassName={clsx(
                  cls.input,
                  !!errors[propsField.name] && cls['input--error']
                )}
                {...field}
                placeholder={propsField.placeholder}
                type={
                  propsField.type === 'password'
                    ? isPasswordShown
                      ? 'text'
                      : 'password'
                    : 'text'
                }
                after={
                  propsField.type === 'password' &&
                  (isPasswordShown ? (
                    <EyeOff className="icon" />
                  ) : (
                    <Eye className="icon" />
                  ))
                }
                onAfterIconClick={() => setIsPasswordShown(!isPasswordShown)}
              />
            )}
            name={propsField.name}
            defaultValue={''}
          />
          {errors[propsField.name] && (
            <span className={cls.error}>
              {(errors[propsField.name] as FieldError)?.message}
            </span>
          )}
        </div>
      ))}
      <Button
        type="submit"
        variant={ButtonVariants.PRIMARY}
        className={cls.button}
        disabled={!isValid || isSubmitting}
      >
        <Arrow />
      </Button>
    </form>
  );
};
