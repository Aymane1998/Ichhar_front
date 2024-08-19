import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getComponement,
  updateComponement,
  createComponement,
  deleteComponement,
  getComponements,
} from './componementsAPI';

export const getComponementAsync = createAsyncThunk(
  'getComponement',
  async ({ id, url, flag }: { id: number; url: string; flag: string }) => {
    const response = await getComponement(id, url, flag);

    return response;
  },
);

export const getComponementsAsync = createAsyncThunk(
  'getComponement',
  async ({
    flag,
    url,
    params = [],
  }: {
    flag: string;
    url: string;
    params?: any;
  }) => {
    const response = await getComponements(url, flag, params);

    return response;
  },
);

export const deleteComponementAsync = createAsyncThunk(
  'deleteComponement',
  async ({ id, url }: { id: number; url: string }) => {
    const response = await deleteComponement(id, url);

    return response;
  },
);

export const updateComponementAsync = createAsyncThunk(
  'updateComponement',
  async ({ id, data, url }: { id: string; data: any; url: string }) => {
    const response = await updateComponement(id, data, url);

    return response;
  },
);

export const createComponementAsync = createAsyncThunk(
  'createComponement',
  async ({ data, url }: { id: string; data: any; url: string }) => {
    const response = await createComponement(data, url);

    return response;
  },
);
