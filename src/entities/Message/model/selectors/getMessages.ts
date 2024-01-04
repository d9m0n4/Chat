import { IState } from 'app/providers/storeProvider/types/Store';

export const getMessages = (state: IState) => state.messages.messagesData;
