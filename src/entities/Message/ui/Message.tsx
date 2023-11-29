import clsx from 'classnames';
import React, { FC } from 'react';
import { BASE_URL } from 'shared/config/api/api';
import { Avatar } from 'shared/ui/Avatar';
import { FileThumb } from 'shared/ui/FileIcon';

import { MessageFile } from '../model/types/Message';
import cls from './Message.module.scss';

interface IMessage {
  dataAttr?: string | number;
  className?: string;
  isSelf?: boolean;
  content: string;
  files?: MessageFile[];
  isRead?: boolean;
  user?: {
    id: number;
    name: string;
    nickName: string;
    avatar?: string | null;
  };
}

export const Message: FC<IMessage> = ({ isSelf, className, content, user, dataAttr, files, isRead }) => {
  return (
    <div data-message-id={dataAttr} className={clsx(cls.message, { [cls.isSelf]: isSelf }, className)}>
      <div className={cls.user}>
        <Avatar name={user?.name} src={user?.avatar && `${BASE_URL}${user.avatar}`} />
      </div>
      <div className={cls.body}>
        {!isRead && <span className={cls.status}></span>}
        <div className={cls.body__content}>{content}</div>
        {files && files.length > 0 && (
          <div className={cls.body__attachments}>
            {files.map((file) => (
              <div key={file.id} className={cls.item}>
                <a href={`http://localhost:5000${file.url}`} target="_blank" rel="noopener noreferrer">
                  <FileThumb name={file.name} ext={file.ext} url={file.url} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
