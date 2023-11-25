import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

interface IUser {
  name: string;
  nickName: string;
  id: number;
  avatar: string;
}
export const fetchUserData = createAsyncThunk(
  'fetchUserData',
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await api.get<IUser>('user/me');
      return data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
