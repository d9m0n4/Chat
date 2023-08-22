import clsx from 'classnames';
import React, { FC } from 'react';
import { Avatar } from 'shared/ui/Avatar';

import { User } from '../../User/model/types/user';
import cls from './Message.module.scss';

interface IMessage {
  className?: string;
  isSelf?: boolean;
  content: string;
  user?: {
    id: number;
    name: string;
    nickName: string;
    avatarUrl: string | null;
  };
}

export const Message: FC<IMessage> = ({ isSelf, className, content, user }) => {
  return (
    <div className={clsx(cls.message, { [cls.isSelf]: isSelf }, className)}>
      <div className={cls.user}>
        <Avatar name={user?.name} />
      </div>
      <div className={cls.body}>{content}</div>
    </div>
  );
};
