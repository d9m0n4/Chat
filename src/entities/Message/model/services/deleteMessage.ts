import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

interface deleteProps {
  messageId: number;
  forAll?: boolean;
}

export const deleteMessage = createAsyncThunk(
  'message/delete',
  async ({ messageId, forAll }: deleteProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.post(`messages/delete/${messageId}`, { deleteForEveryone: forAll });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<ValidationErrors>;
        return rejectWithValue(axiosError.response?.data);
      }

      throw rejectWithValue(e);
    }
  }
);
