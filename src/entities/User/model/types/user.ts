export interface User {
  avatar?: string;
  id: number;
  name?: string;
  nickName: string;
  refreshToken: string;
  accessToken: string;
}

export interface AuthData {
  authData?: Omit<User, 'refreshToken' | 'accessToken'>;
}
