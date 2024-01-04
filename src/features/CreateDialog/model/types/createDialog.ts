import { User } from '../services/findUsers';

export interface ICreateDialog {
  error?: null | string;
  loading: boolean;
  users?: User[];
}
