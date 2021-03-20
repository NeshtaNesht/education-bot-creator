import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

type ReducerFunction<T = null | undefined> = CaseReducer<any, PayloadAction<T>>;

export type { ReducerFunction };
