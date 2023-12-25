import { DialogList } from 'entities/Dialog';
import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import { CreateDialogModal } from 'features/CreateDialog';
import React, { useEffect } from 'react';
import { ReactComponent as Add } from 'shared/assets/icons/plus.svg';
// import { socket } from 'shared/config/api/ws';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { Button } from 'shared/ui/Button';

import cls from './Dialogs.module.scss';

export const Dialogs = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

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
          <DialogList />
        </div>
      </div>

      {isOpen && (
        <CreateDialogModal isOpened={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};
