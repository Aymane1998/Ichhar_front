import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCreator, fetchCreatorByID } from './creatorAPI';

export const fetchCreatorAsync = createAsyncThunk(
  'creator/fetchCreator',
  async () => {
    const response = await fetchCreator();

    return response;
  },
);

export const fetchCreatorByIDAsync = createAsyncThunk(
  'creator/fetchInterventionByID',
  async (id: string | undefined) => {
    const response = await fetchCreatorByID(id);

    return response;
  },
);
