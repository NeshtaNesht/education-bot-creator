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
  home_town: string;
  status: string;
  bdate: string;
  bdate_visibility: number;
  city: {
    id: number;
    title: string;
  };
  country: {
    id: number;
    title: string;
  };
  phone: string;
  relation: number;
  relation_partner: {
    first_name: string;
    id: number;
    last_name: string;
    can_access_closed: boolean;
    is_closed: boolean;
  };
  relation_pending: number;
  sex: Sex;
}

interface OfficeState {
  userInfo: Partial<UserInfo>;
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  OfficeState,
  PayloadAction<T>
>;

export { Sex };
export type { ReducerFunction, OfficeState, UserInfo };
