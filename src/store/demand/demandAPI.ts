import axios from 'axios';
import { BACK_URL } from 'src/config';
import { Demand } from 'src/models/Demand';
import { store } from '../store';
import { DemandPayload } from 'src/hooks/redux/CreateDemandRequest';

export const fetchDemand = async (): Promise<Demand[]> => {
  const { token } = store.getState().auth.login;

  const response = await axios.get<Demand[]>(`${BACK_URL}/api/demande/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createDemand = async (
  data: DemandPayload,
): Promise<DemandPayload> => {
  const { token } = store.getState().auth.login;

  try {
    const response = await axios.post(`${BACK_URL}/api/demand/create/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "Une erreur inconnue s'est produite lors de la création de la demande",
    );
  }
};

export const updateDemand = async (
  id: string,
  data: DemandPayload,
): Promise<DemandPayload> => {
  const { token } = store.getState().auth.login;

  try {
    const response = await axios.put(
      `${BACK_URL}/api/demand/${id}/update/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      "Une erreur inconnue s'est produite lors de la mise à jour de la demande.",
    );
  }
};
