export interface IUser {
  avatar?: string | null;
  id: number;
  name?: string;
  nickName: string;
}

export interface IUserState {
  user?: IUser;
  isLoading?: boolean;
}
