import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

interface AuthState {
  user: any;
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  AuthState,
  PayloadAction<T>
>;

export type { ReducerFunction, AuthState };
