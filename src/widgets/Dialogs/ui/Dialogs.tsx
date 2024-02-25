import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { DialogList } from 'entities/Dialog';
import { isDialogLoading } from 'entities/Dialog/model/selectors/getDialogs';
import {
  dialogActions,
  getDialogs,
} from 'entities/Dialog/model/slices/dialogSlice';
import { CreateDialogModal } from 'features/CreateDialog';
import { ReactComponent as Add } from 'shared/assets/icons/plus.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { Button } from 'shared/ui/Button';

import cls from './Dialogs.module.scss';

export const Dialogs = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const dialogs = useSelector(getDialogs.selectTotal);
  const loading = useSelector(isDialogLoading);

  useEffect(() => {
    socket?.on('dialog_created', (payload) => {
      dispatch(dialogActions.addNewDialog(payload));
    });
    return () => {
      socket?.off('dialog_created');
    };
  }, [socket]);

  return (
    <div className={cls.dialogs}>
      <div className={cls.dialogs__wrapper}>
        <div className={cls.dialogs__heading}>
          <div className={cls.title}>
            <p>Диалоги</p>
            <Button onClick={() => setIsOpen(true)}>
              <Add className="icon" />
            </Button>
          </div>
        </div>
        <div className={cls.dialogs__body}>
          {!loading && dialogs < 1 && (
            <>
              <p className={cls.dialogs__empty}>
                Здесь будут показаны Ваши диалоги
              </p>
            </>
          )}
          <DialogList />
        </div>
      </div>

      {isOpen && (
        <CreateDialogModal isOpened={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};
