/* eslint-disable no-param-reassign */
import { LoadingState } from 'store/types';
import { ReducerFunction, UserSettings } from './types';

const getUserInfo: ReducerFunction = (state) => {
  state.loading = LoadingState.LOADING;
};

const getUserInfoSuccess: ReducerFunction = (state) => {
  state.loading = LoadingState.RESOLVE;
};

const getUserInfoFail: ReducerFunction = (state) => {
  state.loading = LoadingState.REJECT;
};

const reducers = {
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
};

export default reducers;
