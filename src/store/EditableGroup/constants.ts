import { LoadingState } from 'store/types';
import { OfficeState } from './types';

export const initialState: OfficeState = {
  loading: LoadingState.IDLE,
};
export const nameReducer = 'EditableGroups';
