import { LoadingState } from 'store/types';
import { AuthState } from './types';

export const initialState: AuthState = {
  user: {
    access_token: '',
    email: '',
    expires_in: 0,
    user_id: 0,
  },
  loading: LoadingState.IDLE,
};
export const nameReducer = 'Auth';

export const storageTokenName = 'ebc_token';
