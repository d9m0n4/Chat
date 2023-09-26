import React, { FC } from 'react';
import { ReactComponent as Download } from 'shared/assets/icons/download.svg';

import { Button } from '../../Button';
import { FileThumb } from '../../FileIcon';
import cls from './Attach.module.scss';

interface IAttachProps {
  ext: string;
  name: string;
  url: string;
}

export const Attach: FC<IAttachProps> = ({ ext, name, url }) => {
  return (
    <li className={cls.attach}>
      <div className={cls.icon}>
        <FileThumb ext={ext} name={name} url={url} />
      </div>
      <div className={cls.body}>
        <div className={cls.title}>
          <p>Акт сверки 502 02.05.2021</p>
        </div>
        <div className={cls.info}>
          <span>03.05.2021</span>
          <span>24MB</span>
        </div>
      </div>
      <Button>
        <Download className="icon" />
      </Button>
    </li>
  );
};
