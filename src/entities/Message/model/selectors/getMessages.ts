import { RootState } from 'app/providers/storeProvider/config/store';

export const getMessages = (state: RootState) => state.messages.messagesData;
