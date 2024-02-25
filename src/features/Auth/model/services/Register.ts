import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from 'shared/config/api/api';

import { IUserData } from '../types/auth';
import { RegisterData } from '../types/register';

export const register = createAsyncThunk<
  IUserData,
  RegisterData,
  { rejectValue: SerializedError | undefined }
>('register', async (formData: RegisterData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await api.post<IUserData>('auth/signUp', formData);
    return data;
  } catch (err) {
    const axiosError = err as AxiosError<SerializedError>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
