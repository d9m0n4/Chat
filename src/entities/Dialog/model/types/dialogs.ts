import { EntityState } from '@reduxjs/toolkit';
import { IUser } from 'entities/User';

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
  partner: IUser;
  updated_at: Date;
  unreadMessagesCount: number;
}

export interface IActiveDialog {
  id: number;
  partner: IUser;
}

export interface IDialogData extends EntityState<IDialog> {
  activeDialog?: IActiveDialog | null;
  prevActiveDialogId?: number;
  searchValue: string;
  error?: string;
  loading?: boolean;
}
