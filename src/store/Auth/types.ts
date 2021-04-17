import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

interface UserSettings {
  access_token: string;
  email: string;
  expires_in: number;
  user_id: number;
}

interface AuthState {
  user: UserSettings;
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  AuthState,
  PayloadAction<T>
>;

export type { ReducerFunction, AuthState, UserSettings };
