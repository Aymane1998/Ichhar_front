import { createSlice } from '@reduxjs/toolkit';
import { GetCreatorByIDRequest } from 'src/hooks/redux/GetCreatorByIDRequest';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { fetchCreatorByIDAsync } from '../creatorAsync';

const initialState: GetCreatorByIDRequest = {
  creator: null,
  status: ReduxStatus.Idle,
  error: null,
};

const fetchCreatorByIDSlice = createSlice({
  name: 'fetchInterventionByIDSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatorByIDAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(fetchCreatorByIDAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        const data = action.payload;

        state.creator = data;
      })
      .addCase(fetchCreatorByIDAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
      });
  },
});

export default fetchCreatorByIDSlice.reducer;
