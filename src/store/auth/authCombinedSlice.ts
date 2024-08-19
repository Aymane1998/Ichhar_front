import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './authSlices/loginSlice';
import logoutSlice from './authSlices/logoutSlice';
import userInfosSlice from './authSlices/userInfosSlice';
import usersListeSlice from './authSlices/usersListeSlice';
import changePasswordSlice from './authSlices/changePasswordSlice';

const authReducer = combineReducers({
  login: loginSlice,
  logout: logoutSlice,
  userInfos: userInfosSlice,
  usersListe: usersListeSlice,
  changePassword: changePasswordSlice,
});

export default authReducer;
