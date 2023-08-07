export interface IMessage {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    name: string;
    nickName: string;
    avatarUrl: null | string;
  };
}

export interface IMessagesData {
  messagesData: IMessage[] | undefined;
  error: string | null;
  loading: boolean;
}
