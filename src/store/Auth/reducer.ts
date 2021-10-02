/* eslint-disable no-param-reassign */
import { LoadingState } from 'store/types';
import { ReducerFunction, UserSettings } from './types';

const vkAuth: ReducerFunction<{ code: string }> = (state) => {
  state.loading = LoadingState.LOADING;
};
const vkAuthSuccess: ReducerFunction<{ payload: UserSettings }> = (
  state,
  payload
) => {
  state.loading = LoadingState.RESOLVE;
  state.user = payload.payload.payload;
};

const vkAuthRejected: ReducerFunction = (state) => {
  state.loading = LoadingState.REJECT;
};

const reducers = {
  vkAuth,
  vkAuthSuccess,
  vkAuthRejected,
};

export default reducers;
