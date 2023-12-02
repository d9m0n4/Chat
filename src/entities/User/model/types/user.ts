export interface IUser {
  avatar?: string | null;
  id: number;
  name?: string;
  nickName: string;
}

export interface IUserData extends IUser {
  refreshToken: string;
  accessToken: string;
}

export interface AuthData {
  authData?: IUser;
  isLoading?: boolean;
  isAuth: boolean;
}
