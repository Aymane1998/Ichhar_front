import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { DemandPayload } from './CreateDemandRequest';
import { AlertState } from 'src/utils/types/redux';
export type Error = string | null | undefined;

export interface UpdateDemandRequest {
  data: DemandPayload | null;
  error: Error;
  status: ReduxStatus;
  alert: AlertState;
}
