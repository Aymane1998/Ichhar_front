import { createSlice } from '@reduxjs/toolkit';
import { UpdateDemandRequest } from 'src/hooks/redux/UpdateDemandRequest';
import { AlertState } from 'src/utils/types/redux'; // Assurez-vous d'importer la fonction d'action correspondante
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { updateDemandAsync } from '../demandAsync';

const initialAlertState: AlertState = {
  successMessage: '',
  errorMessage: '',
};

const initialState: UpdateDemandRequest = {
  data: null,
  status: ReduxStatus.Idle,
  error: null,
  alert: initialAlertState,
};

const UpdateDemandSlice = createSlice({
  name: 'UpdateInterventionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDemandAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(updateDemandAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.data = action.payload;
        state.alert = {
          successMessage: 'demand updated successfully!',
          errorMessage: '',
        };
      })
      .addCase(updateDemandAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert = {
          successMessage: '',
          errorMessage: 'Failed to update demand.',
        };
      });
  },
});

export default UpdateDemandSlice.reducer;
