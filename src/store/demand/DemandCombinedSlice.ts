import { combineReducers } from '@reduxjs/toolkit';
import fetchDemandSlice from './demandSlices/fetchDemandSlice';
import CreateDemandSlice from './demandSlices/CreateDemandSlice';
import UpdateDemandSlice from './demandSlices/UpdateDemandSlice';

const demandReducer = combineReducers({
  fetchDemand: fetchDemandSlice,
  CreateDemand: CreateDemandSlice,
  UpdateDemand: UpdateDemandSlice,
});

export default demandReducer;
