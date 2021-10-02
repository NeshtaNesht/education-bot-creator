import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

type Subscribe = {
  first_name: string;
  id: number;
  last_name: string;
  deactivated?: string;
  photo_50: string;
  is_closed?: boolean;
  can_access_closed?: boolean;
  inner_group: string | null;
};

type SubscribesData = {
  count: number;
  items: Subscribe[];
};

interface SubscribesState {
  subscribes: SubscribesData;
  offset: number;
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  SubscribesState,
  PayloadAction<T>
>;

export type { SubscribesState, ReducerFunction, SubscribesData, Subscribe };
