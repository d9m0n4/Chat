import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

import { IUserData } from '../types/auth';
import { LoginData } from '../types/login';

export const login = createAsyncThunk<
  IUserData,
  LoginData,
  { rejectValue: ValidationErrors | undefined }
>('login', async (formData: LoginData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await api.post<IUserData>('auth/signIn', formData);
    localStorage.setItem('jwt', data.accessToken);
    return data;
  } catch (err) {
    const axiosError = err as AxiosError<ValidationErrors>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
