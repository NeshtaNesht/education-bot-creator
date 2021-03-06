import { LoadingState } from 'store/types';
import { SubscribesState } from './types';

export const initialState: SubscribesState = {
  subscribes: {
    count: 0,
    items: [],
  },
  offset: 0,
  loading: LoadingState.IDLE,
};
export const nameReducer = 'Subscribes';
