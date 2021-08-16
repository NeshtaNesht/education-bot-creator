import { LoadingState } from 'store/types';
import { DialogsState } from './types';

export const initialState: DialogsState = {
  dialogs: [],
  loading: LoadingState.IDLE,
};
export const nameReducer = 'Dialogs';
