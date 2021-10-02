import { ApplicationState, LoadingState } from 'store/types';
import { GroupsData, UserInfo } from './types';

const userInfo = (state: ApplicationState): Partial<UserInfo> =>
  state.office.userInfo;
const loading = (state: ApplicationState): LoadingState => state.office.loading;

const isLoadingGroups = (state: ApplicationState): LoadingState =>
  state.office.userGroups.isLoading;
const userGroups = (state: ApplicationState): Partial<GroupsData>[] =>
  state.office.userGroups.data;

const officeSelectors = {
  userInfo,
  loading,
  isLoadingGroups,
  userGroups,
};

export default officeSelectors;
