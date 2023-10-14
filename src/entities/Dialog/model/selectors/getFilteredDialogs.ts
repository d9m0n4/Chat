import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/providers/storeProvider/config/store';

const getDialogs = (state: RootState) => state.dialogs.dialogData;
const getSearchValue = (state: RootState) => state.dialogs.searchValue;

export const getFilteredDialogs = createSelector(
  [getDialogs, getSearchValue],
  (dialogs, searchValue) => {
    if (!searchValue) {
      return dialogs;
    }

    const searchRegExp = new RegExp(searchValue, 'i');
    return dialogs.filter((dialog) => searchRegExp.test(dialog.partner.name));
  }
);
