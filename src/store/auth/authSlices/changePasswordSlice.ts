import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { changePasswordAsync } from '../authAsync';
import { NoDataResponse } from 'src/utils/types/redux';

const initialState: NoDataResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    resetChangePasswordRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'changePassword successful';
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'changePassword failed';
      });
  },
});

export const { resetChangePasswordRequest } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
