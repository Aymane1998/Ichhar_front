import { Creator } from 'src/models/Creator';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

export type Error = string | null | undefined;

export interface GetCreatorByIDRequest {
  creator: Creator | null;
  error: Error;
  status: ReduxStatus;
}
