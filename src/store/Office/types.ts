import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

enum Sex {
  'none' = 0,
  'female' = 1,
  'male' = 2,
}

interface UserInfo {
  first_name: string;
  id: number;
  last_name: string;
  can_access_closed: boolean;
  is_closed: false;
  bdate: string;
}

type GroupsData = {
  id: number;
  name: string;
  screen_name: string;
  is_closed: string;
  deactivated: string;
  is_admin: string;
  admin_level: number;
  is_member: number;
  is_advertiser: number;
  invited_by: number;
  type: string;
  photo_50: string;
  photo_100: string;
  photo_200: string;
};

interface UserGroups {
  data: Array<Partial<GroupsData>>;
  isLoading: LoadingState;
}

interface OfficeState {
  userInfo: Partial<UserInfo>;
  userGroups: UserGroups;
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  OfficeState,
  PayloadAction<T>
>;

export { Sex };
export type { ReducerFunction, OfficeState, UserInfo, GroupsData, UserGroups };
