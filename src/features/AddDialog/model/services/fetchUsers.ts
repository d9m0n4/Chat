import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

export interface User {
  name: string;
  nickName: string;
  id: number;
  avatar: string | null;
}
export const fetchUsers = createAsyncThunk(
  'createDialog/fetchUsers',
  async (query: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      if (query) {
        const response = await api.get<User[]>(`/user/search?nickname=${query}`);
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
