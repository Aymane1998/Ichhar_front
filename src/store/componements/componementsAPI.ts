import axios from 'axios';
import { RootState, store } from '../store';
import { BACK_URL } from '../../config';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';

export const deleteComponement = async (id: number, url: string) => {
  const { token } = store.getState().auth.login;

  try {
    const response = await axios.delete(`${BACK_URL}/${url}/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(
      "Une erreur inconnue s'est produite lors de la suppression du composant.",
    );
  }
};

export const getComponement = async (
  id: number,
  url: string,
  flag: string,
): Promise<{ data: any[]; flag: string }> => {
  const { token } = store.getState().auth.login;

  try {
    const response = await axios.get<any>(`${BACK_URL}/${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, flag: flag };
  } catch (error) {
    throw new Error(
      "Une erreur inconnue s'est produite lors de la récupération du composant.",
    );
  }
};

export const getComponements = async (
  url: string,
  flag: string,
  params?: any,
): Promise<{ data: any[]; flag: string; params?: any }> => {
  const { token } = store.getState().auth.login;

  try {
    const response = await axios.get<any>(`${BACK_URL}/${url}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return { data: response.data, flag: flag };
  } catch (error) {
    throw new Error(
      "Une erreur inconnue s'est produite lors de la récupération du composant.",
    );
  }
};

export const updateComponement =
  (
    id: string,
    data: any,
    url: string,
    // eslint-disable-next-line no-unused-vars
    file?: File,
  ): ThunkAction<Promise<any>, RootState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const { token } = getState().auth.login;

    try {
      const response = await axios.put(
        `${BACK_URL}/${url}/${id}/update/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = response.data;

      // You can dispatch a regular action if needed
      dispatch({ type: 'UPDATE_COMPONENT_SUCCESS', payload: result });

      return result; // Return the result for the component to handle
    } catch (error) {
      // Dispatch an error action if needed
      dispatch({ type: 'UPDATE_COMPONENT_FAILURE', error });

      // Rethrow the error for the component to handle
      throw new Error(
        "Une erreur inconnue s'est produite lors de la modification du composant.",
      );
    }
  };

export const createComponement =
  (
    data: any,
    url: string,
    // eslint-disable-next-line no-unused-vars
    file?: File,
    // eslint-disable-next-line no-unused-vars
    contentTFD?: any,
  ): ThunkAction<Promise<any>, RootState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const { token } = getState().auth.login;

    const headerFormData = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const headersWithouFormData = {
      Authorization: `Bearer ${token}`,
    };

    const headers = contentTFD ? headerFormData : headersWithouFormData;

    try {
      const response = await axios.post(`${BACK_URL}/${url}/`, data, {
        headers: headers,
      });

      const result = response.data;

      // You can dispatch a regular action if needed
      dispatch({ type: 'CREATE_COMPONENT_SUCCESS', payload: result });

      return result; // Return the result for the component to handle
    } catch (error) {
      // Dispatch an error action if needed
      dispatch({ type: 'CREATE_COMPONENT_SUCCESS', error });

      // Rethrow the error for the component to handle
      throw new Error(
        "Une erreur inconnue s'est produite lors de la création du composant.",
      );
    }
  };
