import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getUsersListeRequest } from '../types';
import { getUsersListAsync } from '../authAsync';

const initialState: getUsersListeRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [
    {
      id: 0,
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      role: '',
      groups: '',
    },
  ],
};

const usersListeSlice = createSlice({
  name: 'getUsersListe',
  initialState,
  reducers: {
    resetGeUsersListeRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersListAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getUsersListAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getUsersListe successful';
        state.data = action.payload;
      })
      .addCase(getUsersListAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getUsersListe failed';
      });
  },
});

export const { resetGeUsersListeRequest } = usersListeSlice.actions;

export default usersListeSlice.reducer;
