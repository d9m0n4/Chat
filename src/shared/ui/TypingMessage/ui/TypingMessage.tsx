import React from 'react';

import { Avatar } from '../../Avatar';
import cls from './TypingMessage.module.scss';
import { TypingDots } from './dots/TypingDots';

export const TypingMessage = ({ user }: any) => {
  return (
    <div className={cls.typing__message}>
      <div className={cls.typing__message_user}>
        <Avatar width={48} name={user.nickName} src={user.avatar} />
      </div>
      <TypingDots />
    </div>
  );
};
