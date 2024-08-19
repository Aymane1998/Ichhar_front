import { Creator } from 'src/models/Creator';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
export type Error = string | null | undefined;

export interface GetCreatorRequest {
  creators: Creator[];
  error: Error;
  status: ReduxStatus;
}
