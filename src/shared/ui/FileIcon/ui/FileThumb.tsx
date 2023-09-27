import React, { FC } from 'react';
import { ReactComponent as FileIcon } from 'shared/assets/icons/doc.svg';
import { BASE_URL } from 'shared/config/api/api';

import cls from './FileThumb.module.scss';

export interface FileIconProps {
  ext: string;
  name: string;
  url: string;
  width?: number;
}

export const FileThumb: FC<FileIconProps> = ({
  ext,
  name,
  url,
  width = 64,
}) => {
  const isImage = (ext: string) => {
    return ext && ext.match(/(jpg|jpeg|png|gif|webp)$/i);
  };
  return (
    <>
      {isImage(ext) ? (
        <img
          width={`${width}px`}
          className={cls.file__image}
          src={`${BASE_URL}${url}`}
          alt={name}
        />
      ) : (
        <div className={cls.file}>
          <FileIcon width={width} height={width} className={cls.file__icon} />
          <span>{ext}</span>
        </div>
      )}
    </>
  );
};
