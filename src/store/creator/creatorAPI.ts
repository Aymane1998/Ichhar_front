/* eslint-disable no-useless-catch */
import axios from 'axios';
import { store } from '../store';
import { BACK_URL } from 'src/config';
import { Creator } from 'src/models/Creator';

export const fetchCreator = async (): Promise<Creator[]> => {
  const { token } = store.getState().auth.login;

  const response = await axios.get<Creator[]>(`${BACK_URL}/api/createur/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchCreatorByID = async (
  id: string | undefined,
): Promise<Creator> => {
  const { token } = store.getState().auth.login;
  const response = await axios.get<Creator>(`${BACK_URL}/api/createur/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
