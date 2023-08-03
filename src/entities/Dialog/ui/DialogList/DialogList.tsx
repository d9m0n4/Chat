import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import { getDialogs } from '../../model/selectors/getDialogs';
import { fetchDialogs } from '../../model/services/fetchDialogs';
import { DialogItem } from '../DialogItem/DialogItem';
import cls from './DialogList.module.scss';

export const DialogList = () => {
  const dialogs = useSelector(getDialogs);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  return (
    <ul className={cls.list}>
      {dialogs &&
        dialogs.map((dialog) => <DialogItem {...dialog} isOnline={false} key={dialog.id} />)}
    </ul>
  );
};
