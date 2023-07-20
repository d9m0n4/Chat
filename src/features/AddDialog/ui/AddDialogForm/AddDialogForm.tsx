import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Close } from 'shared/assets/icons/x.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import { getUsers } from '../../model/selectors/getUsers';
import { fetchUsers } from '../../model/services/fetchUsers';
import cls from './AddDialogForm.module.scss';

interface AddDialogFormProps {
  onClose: () => void;
}

export const AddDialogForm: FC<AddDialogFormProps> = ({ onClose }) => {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 1000);
  const dispatch = useAppDispatch();

  const users = useSelector(getUsers);

  useEffect(() => {
    dispatch(fetchUsers(debounceValue));
  }, [debounceValue]);

  return (
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
          onChange={setValue}
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
                    <Button className={cls.button}> {'Написать'} </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={cls.footer}></div>
    </div>
  );
};
