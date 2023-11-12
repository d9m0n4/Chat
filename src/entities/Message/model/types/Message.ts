type User = {
  id: number;
  name: string;
  nickName: string;
  avatarUrl: null | string;
};

export interface MessageFile {
  created_at: Date;
  ext: string;
  id: number;
  name: string;
  updated_at: Date;
  url: string;
  fileType: string;
}

export interface IMessage {
  id: number;
  content: string;
  created_at: string;
  updated_at: Date;
  dialog: INewMessageDialog;
  user: User;
  files?: MessageFile[];
  isRead: boolean;
}

export interface GroupedMessages {
  [date: string]: IMessage[];
}

export interface IMessagesData {
  messagesData: GroupedMessages | undefined;
  error: string | null;
  loading: boolean;
}

interface INewMessageDialog {
  created_at: string;
  id: number;
  latestMessage: number;
  updated_at: string;
  users: User[];
}
