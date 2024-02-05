import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

import { ApiError, IUserData } from '../types/auth';
import { LoginData } from '../types/login';

export const login = createAsyncThunk<
  IUserData,
  LoginData,
  { rejectValue: ApiError | undefined }
>('login', async (formData: LoginData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await api.post<IUserData>('auth/signIn', formData);
    localStorage.setItem('jwt', data.accessToken);
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const axiosError = e as AxiosError<ValidationErrors>;
      return rejectWithValue(axiosError.response?.data);
    }
    return rejectWithValue({
      error: 'Unknown Error',
      message: 'An unknown error occurred',
      statusCode: 500,
    });
  }
});
