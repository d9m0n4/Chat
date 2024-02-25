import React, { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SerializedError } from '@reduxjs/toolkit';
import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import { notificationActions } from 'entities/Notifications';
import { ReactComponent as Close } from 'shared/assets/icons/x.svg';
import { BASE_URL } from 'shared/config/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ReducersList } from 'shared/types/Store';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { TypingDots } from 'shared/ui/TypingMessage';

import {
  getIsLoadingFindUsers,
  getUsersState,
} from '../../model/selectors/getUsersState';
import { createDialog } from '../../model/services/createDialog';
import { findUsers } from '../../model/services/findUsers';
import { addDialogReducer } from '../../model/slices/createDialog';
import cls from './CreateDialogForm.module.scss';

const reducers: ReducersList = {
  addDialog: addDialogReducer,
};
interface AddDialogFormProps {
  onClose: () => void;
}

export const CreateDialogForm: FC<AddDialogFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const users = useSelector(getUsersState);
  const isLoading = useSelector(getIsLoadingFindUsers);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleChangeInput = () => {
    if (inputRef.current) {
      dispatch(findUsers(inputRef.current.value));
    }
  };
  const handleCreateDialog = async (partnerId: number) => {
    try {
      const dialog = await dispatch(createDialog(partnerId)).unwrap();
      if (dialog) {
        dispatch(dialogActions.addNewDialog(dialog));
        dispatch(
          dialogActions.setActiveDialog({
            id: dialog.id,
            partner: dialog.partner,
          })
        );
        navigate(`/dialogs/${dialog.id}`);
        onClose();
      }
    } catch (err) {
      const e = err as SerializedError;
      onClose();
      dispatch(notificationActions.setNotification({ message: e.message }));
    }
  };

  const debouncedSearch = useDebounce(handleChangeInput, 1000);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={cls.form}>
        <div className={cls.heading}>
          <div className={cls.title}>Поиск собеседника</div>
          <Button onClick={onClose}>
            <Close className="icon" />
          </Button>
        </div>
        <div className={cls.search}>
          <Input
            after={isLoading && <TypingDots />}
            placeholder="Введите имя собеседника"
            inputClassName={cls.search__field}
            ref={inputRef}
            onChange={debouncedSearch}
          />
        </div>

        <div className={cls.body}>
          {users && (
            <>
              {users?.length > 0 ? (
                <ul className={cls.list}>
                  {users?.map((user) => (
                    <li key={user.id} className={cls.list__item}>
                      <div className={cls.wrapper}>
                        <div className={cls.user}>
                          <Avatar
                            width={40}
                            height={40}
                            name={user.name}
                            src={user.avatar && `${BASE_URL}${user.avatar}`}
                          />
                          <div className={cls.name}>{user.nickName}</div>
                        </div>
                        <div className={cls.info}>
                          <div className={cls.status}>
                            {user.isOnline ? (
                              <span className={cls['status--online']}>
                                онлайн
                              </span>
                            ) : (
                              <span className={cls['status--offline']}>
                                оффлайн
                              </span>
                            )}
                          </div>
                          <Button
                            className={cls.button}
                            onClick={() => handleCreateDialog(user.id)}
                          >
                            Написать
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={cls.empty}>Пользователь не найден</p>
              )}
            </>
          )}
        </div>
      </div>
    </DynamicModuleLoader>
  );
};
