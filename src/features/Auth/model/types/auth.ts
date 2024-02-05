export interface IUserData {
  avatar?: string | null;
  id: number;
  name?: string;
  nickName: string;
  refreshToken: string;
  accessToken: string;
}

export interface AuthState {
  isAuth: boolean;
  error?: string;
  token?: string;
  isLoading: boolean;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
