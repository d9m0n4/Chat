interface User {
  name: string;
  nickName: string;
  id: number;
  avatar: string | null;
}

type Partner = User & {
  isOnline?: boolean;
};
export interface IDialogLastMessage {
  content: string;
  created_at: string;
  id: number;
  updated_at: Date;
  isRead: boolean;
  user: { id: number };
}
export interface IDialog {
  created_at: Date;
  id: number;
  latestMessage: IDialogLastMessage | null;
  partner: Partner;
  updated_at: Date;
  unreadMessagesCount: number;
}

interface activeDialog {
  id: number;
  partner: Partner;
}

export interface IDialogData {
  dialogData: IDialog[];
  activeDialog?: activeDialog;
  prevActiveDialogId?: number;
  searchValue: string;
  error?: string;
  loading?: boolean;
}
