import clsx from 'classnames';
import React, { FC } from 'react';
import { Avatar } from 'shared/ui/Avatar';

import cls from './Message.module.scss';

interface IMessage {
  className?: string;
  isSelf?: boolean;
  content: string;
}

export const Message: FC<IMessage> = ({ isSelf, className, content }) => {
  return (
    <div className={clsx(cls.message, { [cls.isSelf]: isSelf }, className)}>
      <div className={cls.user}>
        <Avatar />
      </div>
      <div className={cls.body}>{content}</div>
    </div>
  );
};
