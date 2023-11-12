import React from 'react';
import { ReactComponent as Dots } from 'shared/assets/icons/dots-horizontal.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button';

import { rightBarActions } from '../model/slices/toggleRightBar';

export const ToggleRightBar = () => {
  const dispatch = useAppDispatch();
  const handleToggleRightBar = () => {
    dispatch(rightBarActions.toggle());
  };
  return (
    <Button onClick={handleToggleRightBar}>
      <Dots className="icon" />
    </Button>
  );
};
