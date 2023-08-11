interface User {
  name: string;
  nickName: string;
  id: number;
  avatar: string | null;
}
interface IDialogLastMessage {
  content: string;
  created_at: Date;
  id: number;
  updated_at: Date;
}
export interface IDialog {
  created_at: Date;
  id: number;
  latestMessage: IDialogLastMessage;
  partner: User;
  updated_at: Date;
}

interface activeDialog {
  id: number;
  partner: User;
}

export interface IDialogData {
  dialogData?: IDialog[];
  activeDialog?: activeDialog;
  error?: string;
  loading?: boolean;
}
