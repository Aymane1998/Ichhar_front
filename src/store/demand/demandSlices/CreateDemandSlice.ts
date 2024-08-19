import { createSlice } from '@reduxjs/toolkit';
import { CreateDemandRequest } from 'src/hooks/redux/CreateDemandRequest';
import { AlertState } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { createDemandAsync } from '../demandAsync';

const initialAlertState: AlertState = {
  successMessage: '',
  errorMessage: '',
};
const initialState: CreateDemandRequest = {
  data: null,
  status: ReduxStatus.Idle,
  error: null,
  alert: initialAlertState,
};

const CreateDemandSlice = createSlice({
  name: 'CreateDemandSlice',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.alert.successMessage = '';
      state.alert.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDemandAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(createDemandAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.data = action.payload;
        state.alert = {
          successMessage: 'La demande à été créée avec succès !',
          errorMessage: '',
        };
      })
      .addCase(createDemandAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert = {
          successMessage: '',
          errorMessage:
            'Un erreur est survenue lors de la création de la demande !',
        };
      });
  },
});

export const { clearMessages } = CreateDemandSlice.actions;

export default CreateDemandSlice.reducer;
