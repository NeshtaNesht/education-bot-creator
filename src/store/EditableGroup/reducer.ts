/* eslint-disable no-param-reassign */
import { LoadingState } from 'store/types';
import { FormStateType, ReducerFunction } from './types';

const addNewKeyword: ReducerFunction<{
  group_id: string;
  data: FormStateType;
}> = (state) => {
  state.loading = LoadingState.LOADING;
};

const reducers = {
  addNewKeyword,
};

export default reducers;
