import { IUser } from 'entities/User';

export interface ICreateDialog {
  error?: null | string;
  loading: boolean;
  users?: IUser[];
}
