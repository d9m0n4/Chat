type User = {
  id: number;
  name: string;
  nickName: string;
  avatarUrl: null | string;
};

export interface IMessage {
  id: number;
  content: string;
  created_at: string;
  updated_at: Date;
  users: User[];
  user: User;
}

export interface GroupedMessages {
  [date: string]: IMessage[];
}

export interface IMessagesData {
  messagesData: GroupedMessages | undefined;
  error: string | null;
  loading: boolean;
}
