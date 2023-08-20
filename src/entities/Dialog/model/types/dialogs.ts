interface User {
  name: string;
  nickName: string;
  id: number;
  avatar: string | null;
}

type Partner = User & {
  isOnline?: boolean;
};
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
  partner: Partner;
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
