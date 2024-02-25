import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from 'shared/config/api/api';

import { Attachment } from '../types/Attachment';

export const getAttachmentByDialogId = createAsyncThunk<
  Attachment[],
  number,
  { rejectValue: SerializedError | undefined }
>('dialog/attachment', async (dialogId: number, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<Attachment[]>(`files?dialogId=${dialogId}`);
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError<SerializedError>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
