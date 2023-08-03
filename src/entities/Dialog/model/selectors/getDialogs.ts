import { RootState } from 'app/providers/storeProvider/config/store';

export const getDialogs = (state: RootState) => state.dialogs.dialogData;
