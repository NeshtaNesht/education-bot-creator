import { LoadingState } from 'store/types';
import { OfficeState } from './types';

export const initialState: OfficeState = {
  userInfo: {},
  userGroups: {
    data: [],
    isLoading: LoadingState.IDLE,
  },
  loading: LoadingState.IDLE,
};
export const nameReducer = 'Office';
