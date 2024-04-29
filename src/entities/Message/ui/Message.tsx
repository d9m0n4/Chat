import React, { FC } from 'react';

import clsx from 'classnames';
import { BASE_URL } from 'shared/config/api/api';
import { Avatar } from 'shared/ui/Avatar';
import { FileThumb } from 'shared/ui/FileIcon';

import { MessageFile } from '../model/types/Message';
import cls from './Message.module.scss';

interface IMessage {
  onClick?: () => void;
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
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Message: FC<IMessage> = ({
  onContextMenu,
  onClick,
  isSelf,
  className,
  content,
  user,
  dataAttr,
  files,
  isRead,
}) => {
  return (
    <div
      data-message-id={dataAttr}
      className={clsx(cls.message, { [cls.isSelf]: isSelf }, className)}
    >
      <div className={cls.user}>
        <Avatar
          name={user?.name}
          src={user?.avatar && `${BASE_URL}${user.avatar}`}
        />
      </div>
      <div className={cls.body} onContextMenu={onContextMenu}>
        {!isRead && <span className={cls.status}></span>}
        <div className={cls.body__content} onClick={onClick}>
          {content}
        </div>
        {files && files.length > 0 && (
          <div className={cls.body__attachments}>
            {files.map((file) => (
              <div key={file.id} className={cls.item}>
                <a
                  href={`${BASE_URL}${file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
