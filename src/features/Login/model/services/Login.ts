import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User/model/slices/userSlice';
import { User } from 'entities/User/model/types/user';
import { api } from 'shared/config/api/api';

interface LoginData {
  nickName: string;
  password: string;
}

export const Login = createAsyncThunk(
  'login',
  async (data: LoginData, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { data: UserData } = await api.post<User>('auth/signIn', data);
      localStorage.setItem(
        'user',
        JSON.stringify({ username: UserData.nickName })
      );
      dispatch(userActions.setAuthData(UserData));
      return UserData;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
