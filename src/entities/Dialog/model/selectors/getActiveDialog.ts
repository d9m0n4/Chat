import { RootState } from 'app/providers/storeProvider/config/store';

export const getActiveDialog = (state: RootState) => state.dialogs.activeDialog;
export const getPrevActiveDialog = (state: RootState) =>
  state.dialogs.prevActiveDialogId;
