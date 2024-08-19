import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { getComponementsAsync } from '../componementsAsync';
import { GetComponementsRequest } from '../types';

// On définit un état initial du state
// Pour un appel on peut gérer les status, erreur et message d'alert dans le state
const initialState: GetComponementsRequest = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: {
    data: [],
    flag: '',
  },
};

// eslint-disable-next-line no-unused-vars
const getComponementsSlice = createSlice({
  name: 'getComponements',
  initialState,
  reducers: {
    // Lorsqu'un appel est effectué il faut s'assurer que lors d'un nouvel appel les infos status/error/alert/data
    // soient remises à l'état initial pour traquer le bon déroulement du nouvel appel
    resetGetComponementsRequest: () => initialState,
  },
  // Les extraReducers permettent de gérer les error/success/loading du fetch associé au slice
  extraReducers: (builder) => {
    builder
      .addCase(getComponementsAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getComponementsAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getComponements successful';
        state.data = action.payload;
      })
      .addCase(getComponementsAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getComponements failed';
      });
  },
});

// On donne accès aux actions du slice aux autres parties de l'application
export const { resetGetComponementsRequest } = getComponementsSlice.actions;

export default getComponementsSlice.reducer;
