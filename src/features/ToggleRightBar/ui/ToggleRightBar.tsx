import React, { FC } from 'react';

import { ReactComponent as Dots } from 'shared/assets/icons/dots-horizontal.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button';

import { rightBarActions } from '../model/slices/toggleRightBar';

interface IToggleRightBarProps {
  classname?: string;
}

export const ToggleRightBar: FC<IToggleRightBarProps> = ({ classname }) => {
  const dispatch = useAppDispatch();
  const handleToggleRightBar = () => {
    dispatch(rightBarActions.toggle());
  };
  return (
    <Button onClick={handleToggleRightBar} className={classname}>
      <Dots className="icon" />
    </Button>
  );
};
