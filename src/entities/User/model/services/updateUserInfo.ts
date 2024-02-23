import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from 'shared/config/api/api';

import { IUser } from '../types/user';

export const updateUserInfo = createAsyncThunk(
  'updateUserInfo',
  async (userInfo: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await api.patch<IUser>('/user/updates', userInfo);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data.message);
      } else {
        throw new Error('Непредвиденная ошибка');
      }
    }
  }
);
