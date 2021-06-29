import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

type FormStateType = {
  keywordTitle: string;
  keyword: string;
  text: string;
};

interface EditableGroupState {
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  EditableGroupState,
  PayloadAction<T>
>;

export type { ReducerFunction, EditableGroupState, FormStateType };
