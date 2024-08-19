import { createAsyncThunk } from '@reduxjs/toolkit';
import { createDemand, fetchDemand, updateDemand } from './demandAPI';
import { DemandPayload } from 'src/hooks/redux/CreateDemandRequest';

export const fetchDemandAsync = createAsyncThunk(
  'demand/fetchDemand',
  async () => {
    const response = await fetchDemand();

    return response;
  },
);

export const createDemandAsync = createAsyncThunk(
  'demand/createDemand',
  async (data: DemandPayload) => {
    const response = await createDemand(data);

    return response;
  },
);

export const updateDemandAsync = createAsyncThunk(
  'demand/updateDemand',
  async ({ id, data }: { id: string; data: DemandPayload }) => {
    const response = await updateDemand(id, data);

    return response;
  },
);
