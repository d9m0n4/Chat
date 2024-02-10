import { IState } from 'app/providers/storeProvider/types/Store';

export const getDialogsState = (state: IState) => state.dialogs;
export const isDialogLoading = (state: IState) => state.dialogs?.loading;
