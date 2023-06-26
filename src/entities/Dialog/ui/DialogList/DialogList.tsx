import React from 'react';

import { DialogItem } from '../DialogItem/DialogItem';
import cls from './DialogList.module.scss';

export const DialogList = () => {
  return (
    <ul className={cls.list}>
      <DialogItem />
      <DialogItem />
      <DialogItem isActive />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
      <DialogItem />
    </ul>
  );
};
