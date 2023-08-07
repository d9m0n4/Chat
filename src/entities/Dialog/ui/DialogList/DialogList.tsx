import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import { getActiveDialog } from '../../model/selectors/getActiveDialog';
import { getDialogs } from '../../model/selectors/getDialogs';
import { fetchDialogs } from '../../model/services/fetchDialogs';
import { dialogActions } from '../../model/slices/dialogSlice';
import { DialogItem } from '../DialogItem/DialogItem';
import cls from './DialogList.module.scss';

export const DialogList = () => {
  const dialogs = useSelector(getDialogs);
  const dialogId = useSelector(getActiveDialog);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  const setActiveDialog = (id: number) => {
    dispatch(dialogActions.setActiveDialog(id));
  };

  return (
    <ul className={cls.list}>
      {dialogs &&
        dialogs.map((dialog) => (
          <DialogItem
            isActive={dialog.id === dialogId}
            {...dialog}
            isOnline={false}
            key={dialog.id}
            onClick={() => setActiveDialog(dialog.id)}
          />
        ))}
    </ul>
  );
};
