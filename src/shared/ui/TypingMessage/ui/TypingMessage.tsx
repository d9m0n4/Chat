import React from 'react';

import { Avatar } from '../../Avatar';
import cls from './TypingMessage.module.scss';

export const TypingMessage = ({ user }: any) => {
  return (
    <div className={cls.typing__message}>
      <div className={cls.typing__message_user}>
        <Avatar width={48} name={user.nickName} src={user.avatar} />
      </div>
      <span className={cls.typing__message_dot} />
      <span className={cls.typing__message_dot} />
      <span className={cls.typing__message_dot} />
    </div>
  );
};
