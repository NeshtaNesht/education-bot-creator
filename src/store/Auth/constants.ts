import { LoadingState } from 'store/types';
import { AuthState } from './types';

export const initialState: AuthState = {
  user: {},
  loading: LoadingState.IDLE,
};
export const nameReducer = 'Auth';

export const authVkUrl = 'https://oauth.vk.com/authorize';
