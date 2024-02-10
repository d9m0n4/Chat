import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

import { ApiError, IUserData } from '../types/auth';
import { RegisterData } from '../types/register';

export const register = createAsyncThunk<
  IUserData,
  RegisterData,
  { rejectValue: ApiError | undefined }
>('register', async (formData: RegisterData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await api.post<IUserData>('auth/signUp', formData);
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
