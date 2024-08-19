import { combineReducers } from '@reduxjs/toolkit';
import createSlice from './componementsSlices/createSlice';
import getSlice from './componementsSlices/getAllSlice';
import updateSlice from './componementsSlices/updateSlice';

// On combine tous les Slices liés aux Componements pour ne former qu'un seul reducer que l'on pourra passer au store
const componementsReducer = combineReducers({
  createSlice: createSlice,
  getSlice: getSlice,
  updateSlice: updateSlice,
});

export default componementsReducer;
