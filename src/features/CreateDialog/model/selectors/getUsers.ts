import { RootState } from 'app/providers/storeProvider/config/store';

export const getUsers = (state: RootState) => state.addDialog.users;
