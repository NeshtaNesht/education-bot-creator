/* eslint-disable no-param-reassign */
import { Reducer } from 'react';
import { LoadingState } from 'store/types';
import { ReducerFunction, SubscribesData } from './types';

const getSubscribes: ReducerFunction<{ group_id: string }> = (state) => {
  state.loading = LoadingState.LOADING;
};

const getSubscribesSuccess: ReducerFunction<{ data: SubscribesData }> = (
  state,
  { payload }
) => {
  state.loading = LoadingState.RESOLVE;
  state.subscribes = payload.data;
};

const getSubscribesFail: ReducerFunction = (state) => {
  state.loading = LoadingState.REJECT;
};

const changeInnerGroup: ReducerFunction<{
  inner_group_id: string;
  user_id: number;
  group_id: string;
}> = (state, { payload }) => {
  const user = state.subscribes.items.find((el) => el.id === payload.user_id);
  if (user) {
    user.inner_group = payload.inner_group_id;
  }
};

export default {
  getSubscribes,
  getSubscribesSuccess,
  getSubscribesFail,
  changeInnerGroup,
};
