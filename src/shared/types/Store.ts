import { Reducer } from '@reduxjs/toolkit';

import { IStateKey } from '../../app/providers/storeProvider/types/Store';

export type ReducersList = {
  [name in IStateKey]?: Reducer;
};
