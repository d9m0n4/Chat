import React, { FC, useState } from 'react';

import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Input } from 'shared/ui/Input/Input';

interface ISearchDialogsProps {
  classname?: string;
}

export const SearchDialogs: FC<ISearchDialogsProps> = ({ classname }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleFilterDialogs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    dispatch(dialogActions.setSearchValue(e.target.value));
  };
  return (
    <Input
      containerClassName={classname}
      placeholder="Поиск диалогов"
      value={inputValue}
      onChange={handleFilterDialogs}
    />
  );
};
