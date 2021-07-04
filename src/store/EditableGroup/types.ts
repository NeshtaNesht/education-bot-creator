import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

type FormStateType = {
  keywordTitle: string;
  keyword: string;
  text: string;
};

type KeywordsData = FormStateType & {
  _id: string;
  group_id: string;
};

interface KeywordsState {
  data: KeywordsData[];
  isLoading: LoadingState;
}

interface EditableGroupState {
  loading: LoadingState;
  keywords: KeywordsState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  EditableGroupState,
  PayloadAction<T>
>;

export type {
  ReducerFunction,
  EditableGroupState,
  FormStateType,
  KeywordsState,
  KeywordsData,
};
