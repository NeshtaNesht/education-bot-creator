import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

interface OfficeState {
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  OfficeState,
  PayloadAction<T>
>;

export type { ReducerFunction, OfficeState };
