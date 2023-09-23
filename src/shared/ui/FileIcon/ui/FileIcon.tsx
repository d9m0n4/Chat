import React, { FC } from 'react';
import fileIcon from 'shared/assets/icons/file.svg';

import cls from './FileIcon.module.scss';

export interface File {
  created_at: Date;
  ext: string;
  id: number;
  name: string;
  updated_at: Date;
  url: string;
  fileType: string;
}

export const FileIcon = (file: File) => {
  const isImage = (file: File) => {
    return file.ext && file.ext.match(/(jpg|jpeg|png|gif|webp)$/i);
  };
  return (
    <>
      {isImage(file) ? (
        <img src={file.url} alt={file.name} />
      ) : (
        <img alt={file.name} />
      )}
    </>
  );
};
