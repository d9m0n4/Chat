export interface IUser {
  avatar?: string | null;
  id: number;
  name: string;
  nickName: string;
  isOnline?: boolean;
}

export interface IUserState {
  user?: IUser;
  isLoading?: boolean;
  error?: string;
}
