import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Close } from 'shared/assets/icons/x.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ReducersList } from 'shared/types/Store';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import { getUsers } from '../../model/selectors/getUsers';
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
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 1000);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  const users = useSelector(getUsers);

  const handleCreateDialog = (id: number) => {
    dispatch(createDialog(id));
    socket?.emit('create_dialog', { dialogId: id });
  };

  useEffect(() => {
    dispatch(findUsers(debounceValue));
  }, [debounceValue]);

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
            placeholder={'Введите имя собеседника'}
            className={cls.search__field}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        {users && (
          <div className={cls.body}>
            <ul className={cls.list}>
              {users?.map((user) => (
                <li key={user.id} className={cls.list__item}>
                  <div className={cls.wrapper}>
                    <div className={cls.user}>
                      <Avatar width={40} height={40} />
                      <div className={cls.name}>{user.nickName}</div>
                    </div>
                    <div className={cls.info}>
                      <div className={cls.status}>онлайн</div>
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
          </div>
        )}
        <div className={cls.footer}></div>
      </div>
    </DynamicModuleLoader>
  );
};
