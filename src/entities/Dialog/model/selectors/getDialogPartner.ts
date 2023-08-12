import { RootState } from 'app/providers/storeProvider/config/store';

export const getDialogPartner = (state: RootState) =>
  state.dialogs.activeDialog?.partner;
