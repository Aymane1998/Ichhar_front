import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getComponementAsync } from '../componementsAsync';
import { GetComponementRequest } from '../types';

// On définit un état initial du state
// Pour un appel on peut gérer les status, erreur et message d'alert dans le state
const initialState: GetComponementRequest = {
  status: ReduxStatus.Idle,
  error: null,
  data: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

// eslint-disable-next-line no-unused-vars
const getComponementSlice = createSlice({
  name: 'getComponement',
  initialState,
  reducers: {
    // Lorsqu'un appel est effectué il faut s'assurer que lors d'un nouvel appel les infos status/error/alert/data
    // soient remises à l'état initial pour traquer le bon déroulement du nouvel appel
    resetGetComponementRequest: () => initialState,
  },
  // Les extraReducers permettent de gérer les error/success/loading du fetch associé au slice
  extraReducers: (builder) => {
    builder
      .addCase(getComponementAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getComponementAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getComponement successful';
        state.data = action.payload;
      })
      .addCase(getComponementAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getComponement failed';
      });
  },
});

// On donne accès aux actions du slice aux autres parties de l'application
export const { resetGetComponementRequest } = getComponementSlice.actions;

export default getComponementSlice.reducer;
