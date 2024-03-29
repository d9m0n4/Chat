import React, { FC } from 'react';

import { ReactComponent as FileIcon } from 'shared/assets/icons/doc.svg';
import { BASE_URL } from 'shared/config/api/api';

import { AppImage } from '../../Image';
import { Skeleton } from '../../Skeleton';
import cls from './FileThumb.module.scss';

export interface FileIconProps {
  ext: string;
  name?: string;
  url: string;
  width?: number;
}

export const FileThumb: FC<FileIconProps> = ({ ext, url, width = 64 }) => {
  const isImage = (ext: string) => {
    return ext && ext.match(/(jpg|jpeg|png|gif|webp)$/i);
  };
  return (
    <>
      {isImage(ext) ? (
        <AppImage
          className={cls.file__image}
          width={width}
          src={`${BASE_URL}${url}`}
          fallback={<Skeleton width={width} height={width} borderRadius={8} />}
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
