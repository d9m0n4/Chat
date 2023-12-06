import { IUser } from 'entities/User/model/types/user';
import React from 'react';

import { Avatar } from '../../Avatar';
import cls from './TypingMessage.module.scss';
import { TypingDots } from './dots/TypingDots';

export const TypingMessage = ({ user }: { user: IUser }) => {
  return (
    <div className={cls.typing__message}>
      <div className={cls.typing__message_user}>
        <Avatar width={48} name={user.name} src={user.avatar} />
      </div>
      <TypingDots />
    </div>
  );
};
