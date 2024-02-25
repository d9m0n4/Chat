import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

import { IUser } from '../types/user';

export const fetchUserData = createAsyncThunk<
  IUser,
  void,
  { rejectValue: SerializedError | undefined }
>('fetchUserData', async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await api.get<IUser>('user/me');
    return data;
  } catch (err) {
    const axiosError = err as AxiosError<ValidationErrors>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
