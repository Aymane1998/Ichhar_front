import { Demand } from 'src/models/Demand';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
export type Error = string | null | undefined;

export interface GetDemandRequest {
  demands: Demand[];
  error: Error;
  status: ReduxStatus;
}
