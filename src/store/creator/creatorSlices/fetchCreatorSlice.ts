import { createSlice } from '@reduxjs/toolkit';
import { GetCreatorRequest } from 'src/hooks/redux/GetCreatorRequest';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { fetchCreatorAsync } from '../creatorAsync';

const initialState: GetCreatorRequest = {
  creators: [],
  status: ReduxStatus.Idle,
  error: null,
};

const fetchCreatorSlice = createSlice({
  name: 'fetchCreatorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatorAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(fetchCreatorAsync.fulfilled, (state, action) => {
        const data = action.payload;

        state.status = ReduxStatus.Succeeded;
        state.creators = data;
      })
      .addCase(fetchCreatorAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
      });
  },
});

export default fetchCreatorSlice.reducer;
