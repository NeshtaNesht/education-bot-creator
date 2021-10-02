/* eslint-disable no-param-reassign */
import { LoadingState } from 'store/types';
import { ReducerFunction, GroupsData, UserInfo } from './types';

const getUserInfo: ReducerFunction = (state) => {
  state.loading = LoadingState.LOADING;
};

const getUserInfoSuccess: ReducerFunction<{ userInfo: UserInfo }> = (
  state,
  { payload }
) => {
  state.loading = LoadingState.RESOLVE;
  state.userInfo = payload.userInfo;
};

const getUserInfoFail: ReducerFunction = (state) => {
  state.loading = LoadingState.REJECT;
};

const getUserGroups: ReducerFunction = (state) => {
  state.userGroups.isLoading = LoadingState.LOADING;
};

const getUserGroupsSuccess: ReducerFunction<{ data: GroupsData[] }> = (
  state,
  { payload }
) => {
  state.userGroups.isLoading = LoadingState.RESOLVE;
  state.userGroups.data = payload.data;
};

const getUserGroupsFail: ReducerFunction = (state) => {
  state.userGroups.isLoading = LoadingState.REJECT;
};

const vkAuthGroup: ReducerFunction<{
  code?: string;
  group_id: string;
}> = () => {};

const reducers = {
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  getUserGroups,
  getUserGroupsSuccess,
  getUserGroupsFail,
  vkAuthGroup,
};

export default reducers;
