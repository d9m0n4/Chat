import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import { getActiveDialog } from '../../model/selectors/getActiveDialog';
import { getDialogs } from '../../model/selectors/getDialogs';
import { getFilteredDialogs } from '../../model/selectors/getFilteredDialogs';
import { fetchDialogs } from '../../model/services/fetchDialogs';
import { dialogActions } from '../../model/slices/dialogSlice';
import { DialogItem } from '../DialogItem/DialogItem';
import cls from './DialogList.module.scss';

export const DialogList = () => {
  const dialogs = useSelector(getFilteredDialogs);
  const dialogId = useSelector(getActiveDialog);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  const setActiveDialog = ({ id, partner }: { id: number; partner: any }) => {
    dispatch(dialogActions.setActiveDialog({ id, partner }));
  };

  return (
    <ul className={cls.list}>
      {dialogs &&
        dialogs.map((dialog) => (
          <Link key={dialog.id} to={`${dialog.id}`}>
            <DialogItem
              isActive={dialog.id === dialogId?.id}
              {...dialog}
              isOnline={dialog.partner.isOnline}
              onClick={() =>
                setActiveDialog({ id: dialog.id, partner: dialog.partner })
              }
            />
          </Link>
        ))}
    </ul>
  );
};
