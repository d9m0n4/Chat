import clsx from 'classnames';
import React, { FC } from 'react';
import { Avatar } from 'shared/ui/Avatar';

import { MessageFile } from '../model/types/Message';
import cls from './Message.module.scss';

interface IMessage {
  dataAttr?: string | number;
  className?: string;
  isSelf?: boolean;
  content: string;
  files?: MessageFile[];
  user?: {
    id: number;
    name: string;
    nickName: string;
    avatarUrl: string | null;
  };
}

export const Message: FC<IMessage> = ({
  isSelf,
  className,
  content,
  user,
  dataAttr,
  files,
}) => {
  return (
    <div
      data-message-id={dataAttr}
      className={clsx(cls.message, { [cls.isSelf]: isSelf }, className)}
    >
      <div className={cls.user}>
        <Avatar name={user?.name} />
      </div>
      <div className={cls.body}>
        <div className={cls.body__content}>{content}</div>
        {files && (
          <div className={cls.body__attachments}>
            {files.map((file) => (
              <div key={file.id} className={cls.item}>
                <img src={`http://localhost:5000${file.url}`} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
