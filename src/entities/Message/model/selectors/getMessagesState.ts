import { RootState } from 'app/providers/storeProvider/config/store';

export const getMessagesState = (state: RootState) => state.messages;
