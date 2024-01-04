import { createSelector } from '@reduxjs/toolkit';
import { IState } from 'app/providers/storeProvider/types/Store';

const getDialogs = (state: IState) => state.dialogs.dialogData;
const getSearchValue = (state: IState) => state.dialogs.searchValue;

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
