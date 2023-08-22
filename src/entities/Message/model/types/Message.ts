type User = {
  id: number;
  name: string;
  nickName: string;
  avatarUrl: null | string;
};

export interface IMessage {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  users: User[];
  user: User;
}

export interface IMessagesData {
  messagesData: IMessage[] | undefined;
  error: string | null;
  loading: boolean;
}
