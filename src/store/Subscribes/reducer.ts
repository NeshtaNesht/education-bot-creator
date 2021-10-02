/* eslint-disable no-param-reassign */
import { Reducer } from 'react';
import { LoadingState } from 'store/types';
import { initialState } from './constants';
import { ReducerFunction, SubscribesData } from './types';

const getSubscribes: ReducerFunction<{ group_id: string }> = (state) => {
  state.loading = LoadingState.LOADING;
};

const getSubscribesSuccess: ReducerFunction<{ data: SubscribesData }> = (
  state,
  { payload }
) => {
  state.loading = LoadingState.RESOLVE;
  const currentSubscribes = state.subscribes.items;
  Array.prototype.push.apply(currentSubscribes, payload.data.items);
  state.subscribes.items = currentSubscribes;
  state.subscribes.count = payload.data.count;
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

const addOffset: ReducerFunction = (state) => {
  state.offset += 50;
};

const setDefaultSubscribes: ReducerFunction = (state) => {
  state.subscribes.items = initialState.subscribes.items;
  state.offset = 0;
};

const deleteUserFromGroup: ReducerFunction<{
  group_id: string;
  user_id: number;
}> = (state, { payload }) => {
  state.subscribes.items = state.subscribes.items.map((el) => {
    if (el.id === payload.user_id) {
      return {
        ...el,
        inner_group: null,
      };
    }
    return el;
  });
};

export default {
  getSubscribes,
  getSubscribesSuccess,
  getSubscribesFail,
  changeInnerGroup,
  addOffset,
  setDefaultSubscribes,
  deleteUserFromGroup,
};
