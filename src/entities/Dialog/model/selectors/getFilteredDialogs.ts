import { createSelector } from '@reduxjs/toolkit';
import { IState } from 'app/providers/storeProvider/types/Store';

import { getDialogs } from '../slices/dialogSlice';

const getSearchValue = (state: IState) => state.dialogs?.searchValue;

export const getFilteredDialogs = createSelector(
  [getDialogs.selectAll, getSearchValue],
  (dialogs, searchValue) => {
    if (!searchValue) {
      return dialogs;
    }

    const searchRegExp = new RegExp(searchValue, 'i');
    return dialogs.filter((dialog) => searchRegExp.test(dialog.partner.name));
  }
);
