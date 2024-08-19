import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { fetchDemandAsync } from '../demandAsync';
import { GetDemandRequest } from 'src/hooks/GetDemandRequest';

const initialState: GetDemandRequest = {
  demands: [],
  status: ReduxStatus.Idle,
  error: null,
};

const fetchDemandSlice = createSlice({
  name: 'fetchDemandSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemandAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(fetchDemandAsync.fulfilled, (state, action) => {
        const data = action.payload;

        state.status = ReduxStatus.Succeeded;
        state.demands = data;
      })
      .addCase(fetchDemandAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
      });
  },
});

export default fetchDemandSlice.reducer;
