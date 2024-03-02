import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from 'shared/config/api/api';

import { IUser } from '../types/user';

export const updateUserInfo = createAsyncThunk<
  IUser,
  FormData,
  { rejectValue: SerializedError | undefined }
>('updateUserInfo', async (userInfo: FormData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await api.patch<IUser>('/user/update', userInfo);
    return data;
  } catch (err) {
    const axiosError = err as AxiosError<SerializedError>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
