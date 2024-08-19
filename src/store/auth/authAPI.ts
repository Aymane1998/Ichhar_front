import axios, { AxiosResponse } from 'axios';
import { BACK_URL } from 'src/config';
import { AuthData, AuthToken } from 'src/utils/types/authData';
import { UserInfos } from 'src/utils/types/UserInfos';
import { store } from '../store';
import { ChangePasswordPayload } from './types';
import { NoDataResponse } from 'src/utils/types/redux';

export const login = async (body: AuthData): Promise<AuthToken> => {
  const response = await axios.post<AuthToken>(
    `${BACK_URL}/auth/api/token/`,
    body,
  );

  return response.data;
};
export const logout = async (): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(`${BACK_URL}/logout/`);

  return response.data;
};

export const getUserInfos = async (): Promise<UserInfos> => {
  const { token } = store.getState().auth.login;
  const response = await axios.get<UserInfos>(
    `${BACK_URL}/auth/current-user/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getUserListe = async (): Promise<UserInfos[]> => {
  const { token } = store.getState().auth.login;
  const response = await axios.get<UserInfos[]>(`${BACK_URL}/api/user/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { token } = store.getState().auth.login;
  const response = await axios.post<NoDataResponse>(
    `${BACK_URL}/auth/api/update-password/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
};
