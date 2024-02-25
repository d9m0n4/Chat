import React, { FC, useEffect } from 'react';
import { useStore } from 'react-redux';

import {
  IState,
  ReduxStoreWithReducerManager,
} from 'app/providers/storeProvider/types/Store';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { ReducersList } from '../../types/Store';

interface IDynamicModuleLoader {
  children: React.ReactNode;
  reducers: ReducersList;
  willUnmount?: boolean;
}
export const DynamicModuleLoader: FC<IDynamicModuleLoader> = ({
  willUnmount = true,
  reducers,
  children,
}) => {
  const store = useStore() as ReduxStoreWithReducerManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as keyof IState, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });
    return () => {
      if (willUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as keyof IState);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, []);

  return <>{children}</>;
};
