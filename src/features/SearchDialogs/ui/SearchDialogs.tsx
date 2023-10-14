import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import React, { FC, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Input } from 'shared/ui/Input/Input';

import cls from './SearchDialogs.module.scss';

export const SearchDialogs = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleFilterDialogs = (value: string) => {
    setInputValue(value);
    dispatch(dialogActions.setSearchValue(value));
  };
  return (
    <Input
      className={cls.search__field}
      placeholder="Поиск диалогов"
      value={inputValue}
      onChange={handleFilterDialogs}
    />
  );
};
