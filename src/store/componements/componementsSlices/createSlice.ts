import { createSlice } from '@reduxjs/toolkit';
import { AlertState } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { createComponementAsync } from '../componementsAsync';
import { CreateComponementRequest } from '../types';

const initialAlertState: AlertState = {
  successMessage: '',
  errorMessage: '',
};
const initialState: CreateComponementRequest = {
  data: null,
  status: ReduxStatus.Idle,
  error: null,
  alert: initialAlertState,
};

const createComponementSlice = createSlice({
  name: 'createSlice',
  initialState,
  reducers: {
    resetCreateComponement: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComponementAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(createComponementAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.data = action.payload;
        state.alert = {
          successMessage: 'La composant  à été créée avec succès !',
          errorMessage: '',
        };
      })
      .addCase(createComponementAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert = {
          successMessage: '',
          errorMessage:
            'Un erreur est survenue lors de la création du composant  !',
        };
      });
  },
});

export const { resetCreateComponement } = createComponementSlice.actions;

export default createComponementSlice.reducer;
