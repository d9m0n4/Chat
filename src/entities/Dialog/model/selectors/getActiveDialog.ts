import { IState } from 'app/providers/storeProvider/types/Store';

export const getActiveDialog = (state: IState) => state.dialogs.activeDialog;
export const getPrevActiveDialog = (state: IState) =>
  state.dialogs.prevActiveDialogId;
