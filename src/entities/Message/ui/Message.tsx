import clsx from 'classnames';
import React, { FC } from 'react';
import { Avatar } from 'shared/ui/Avatar';

import cls from './Message.module.scss';

interface IMessage {
  className?: string;
  isSelf?: boolean;
}

export const Message: FC<IMessage> = ({ isSelf, className }) => {
  return (
    <div className={clsx(cls.message, { [cls.isSelf]: isSelf }, className)}>
      <div className={cls.user}>
        <Avatar />
      </div>
      <div className={cls.body}>
        Значит, мастеру должно изготовлять руль под присмотром кормчего, если он намерен сделать
        хороший руль?
      </div>
    </div>
  );
};
