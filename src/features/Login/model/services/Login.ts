import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { userActions } from 'entities/User/model/slices/userSlice';
import { IUserData } from 'entities/User/model/types/user';
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
      const { data: userData } = await api.post<IUserData>('auth/signIn', data);
      localStorage.setItem('jwt', userData.accessToken);
      dispatch(userActions.setAuthData(userData));
      return userData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;
        return axiosError.response?.data;
      }
      return rejectWithValue(e);
    }
  }
);
