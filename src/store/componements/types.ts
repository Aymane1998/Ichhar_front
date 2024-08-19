import { AlertState, Error } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

export interface GetComponementsRequest {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
  data: {
    data: any[];
    flag: string;
  };
}

export interface UpdateComponementRequest {
  data: any | null;
  error: Error;
  status: ReduxStatus;
  alert: AlertState;
}

export type CreateComponementRequest = {
  data: any;
  status: ReduxStatus;
  error: string | null | undefined;
  alert: AlertState;
};

export interface GetComponementRequest {
  data: any | null;
  status: ReduxStatus;
  error: string | null | undefined;
  alert: AlertState;
}

export interface UpdateComponementRequest {
  data: any | null;
  error: Error;
  status: ReduxStatus;
  alert: AlertState;
}
