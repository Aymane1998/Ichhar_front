import { createSlice } from '@reduxjs/toolkit';
import { AlertState } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues'; // Assurez-vous d'importer la fonction d'action correspondante
import { updateComponementAsync } from '../componementsAsync';
import { UpdateComponementRequest } from '../types';

const initialAlertState: AlertState = {
  successMessage: '',
  errorMessage: '',
};

const initialState: UpdateComponementRequest = {
  data: null,
  status: ReduxStatus.Idle,
  error: null,
  alert: initialAlertState,
};

const updateComponementSlice = createSlice({
  name: 'updateComponementSlice',
  initialState,
  reducers: { resetUpdateComponementRequest: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(updateComponementAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(updateComponementAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.data = action.payload;
        state.alert = {
          successMessage: 'Componement updated successfully!',
          errorMessage: '',
        };
      })
      .addCase(updateComponementAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert = {
          successMessage: '',
          errorMessage: 'Failed to update Componement.',
        };
      });
  },
});

export const { resetUpdateComponementRequest } = updateComponementSlice.actions;

export default updateComponementSlice.reducer;
