import clsx from 'classnames';
import React, { FC } from 'react';
import { ReturnFileExt } from 'shared/utils/files/files';

import cls from './FilePreviewer.module.scss';

interface FilePreviewerProps {
  files?: File[] | null;
}

export const FilePreviewer: FC<FilePreviewerProps> = ({ files }) => {
  return (
    <div className={cls.filePreviewer}>
      {files &&
        files.map((file) =>
          file.type.includes('image') ? (
            <img
              className={clsx(cls.filePreviewer__file, cls.image)}
              key={file.name}
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          ) : (
            <div key={file.name} className={cls.filePreviewer__file}>
              {ReturnFileExt(file)}
            </div>
          )
        )}
    </div>
  );
};
