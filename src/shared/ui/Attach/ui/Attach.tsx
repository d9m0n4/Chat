import React from 'react';
import { ReactComponent as Download } from 'shared/assets/icons/download.svg';
import { ReactComponent as PDF } from 'shared/assets/icons/pdf.svg';

import { Button } from '../../Button';
import cls from './Attach.module.scss';

export const Attach = () => {
  return (
    <li className={cls.attach}>
      <div className={cls.icon}>
        <PDF />
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
