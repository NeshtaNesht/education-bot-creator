import { LoadingState } from 'store/types';
import { OfficeState } from './types';

export const initialState: OfficeState = {
  userInfo: {},
  loading: LoadingState.IDLE,
};
export const nameReducer = 'Office';
