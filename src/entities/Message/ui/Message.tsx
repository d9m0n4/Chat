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
        {files && files.length > 0 && (
          <div className={cls.body__attachments}>
            {files.map((file) => (
              <div key={file.id} className={cls.item}>
                {file.ext === 'webp' ? (
                  <a
                    href={`http://localhost:5000${file.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={`http://localhost:5000${file.url}`} alt="" />
                  </a>
                ) : (
                  <a
                    href={`http://localhost:5000${file.url}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt="File" />
                    {file.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
