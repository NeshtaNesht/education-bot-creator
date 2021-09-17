import { LoadingState } from 'store/types';
import { EditableGroupState } from './types';

export const initialState: EditableGroupState = {
  loading: LoadingState.IDLE,
  keywords: {
    data: [],
    isLoading: LoadingState.IDLE,
  },
  innerGroups: {
    data: [],
    isLoading: LoadingState.IDLE,
  },
};
export const nameReducer = 'EditableGroups';
