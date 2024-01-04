import { IState } from 'app/providers/storeProvider/types/Store';

export const getDialogPartner = (state: IState) =>
  state.dialogs.activeDialog?.partner;
