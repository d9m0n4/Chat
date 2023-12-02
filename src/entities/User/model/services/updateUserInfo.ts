import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { IUser } from '../types/user';

// interface IUpdateUserInfo {
//   name: string;
//   nickName: string;
//   avatar: File;
// }
export const updateUserInfo = createAsyncThunk('updateUserInfo', async (userInfo: FormData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await api.patch<IUser>('/user/update', userInfo);
    return data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
