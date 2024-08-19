import { AlertState } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

export type Error = string | null | undefined;

export interface DemandPayload {
  id: string;
  duration: string;
  deadline: any;
  description: string;
  type_video: string;
  language: string;
  gender: string;
  comments: string;
  taken: boolean;
}

export interface CreateDemandRequest {
  data: DemandPayload | null;
  error: Error;
  status: ReduxStatus;
  alert: AlertState;
}
