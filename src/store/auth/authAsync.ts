import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData } from 'src/utils/types/authData';
import {
  getUserInfos,
  login,
  logout,
  getUserListe,
  changePassword,
} from './authAPI';
import { ChangePasswordPayload } from './types';

export const loginlAsync = createAsyncThunk(
  'menu/login',
  async (body: AuthData) => {
    const response = await login(body);

    return response;
  },
);
export const logoutlAsync = createAsyncThunk('menu/logout', async () => {
  const response = await logout();

  return response;
});

export const getUserInfosAsync = createAsyncThunk(
  'auth/current-user',
  async () => {
    const response = await getUserInfos();

    return response;
  },
);

export const getUsersListAsync = createAsyncThunk('api/user', async () => {
  const response = await getUserListe();

  return response;
});

export const changePasswordAsync = createAsyncThunk(
  'auth/changePassword',
  async (body: ChangePasswordPayload) => {
    const response = await changePassword(body);

    return response;
  },
);
