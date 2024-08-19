import { combineReducers } from '@reduxjs/toolkit';
import fetchCreatorSlice from './creatorSlices/fetchCreatorSlice';
import fetchCreatorByIDSlice from './creatorSlices/fetchCreatorByIDSlice';

const creatorReducer = combineReducers({
  fetchCreator: fetchCreatorSlice,
  fetchCreatorById: fetchCreatorByIDSlice,
});

export default creatorReducer;
