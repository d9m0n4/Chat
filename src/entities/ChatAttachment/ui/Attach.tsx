import React, { FC } from 'react';

import { ReactComponent as Download } from 'shared/assets/icons/download.svg';
import { Button } from 'shared/ui/Button';
import { FileThumb } from 'shared/ui/FileIcon';
import { fileSize } from 'shared/utils/fileSize/fileSize';
import { formatDate } from 'shared/utils/formatDate/formatDate';

import { BASE_URL } from '../../../shared/config/api';
import { Attachment } from '../model/types/Attachment';
import cls from './Attach.module.scss';

interface IAttachProps
  extends Omit<Attachment, 'updated_at' | 'fileType' | 'id'> {
  width?: number;
}

export const Attach: FC<IAttachProps> = ({
  ext,
  name,
  url,
  width = 32,
  originalName,
  size,
  created_at,
}) => {
  return (
    <li className={cls.attach}>
      <div className={cls.icon}>
        <FileThumb ext={ext} name={name} url={url} width={width} />
      </div>
      <div className={cls.body}>
        <div className={cls.title}>
          <p>{originalName}</p>
        </div>
        <div className={cls.info}>
          <span>{formatDate(created_at)}</span>
          <span>{fileSize(size)}</span>
        </div>
      </div>
      <Button className={cls.download}>
        <a href={`${BASE_URL}${url}`} target="_blank" rel="noopener noreferrer">
          <Download className="icon" />
        </a>
      </Button>
    </li>
  );
};
