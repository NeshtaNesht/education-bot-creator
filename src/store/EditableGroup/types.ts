import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

type InnerGroupType = {
  name: string;
  _id: string;
};

interface InnerGroupState {
  data: InnerGroupType[];
  isLoading: LoadingState;
}

type FormStateType = {
  keywordTitle: string;
  keyword: string;
  text: string;
  dialogId?: string;
};

type KeywordsData = FormStateType & {
  _id: string;
  group_id: string;
};

interface KeywordsState {
  data: KeywordsData[];
  isLoading: LoadingState;
}

type MailingsData = {
  groups: string[];
  message: string;
  date: Date;
};

interface MailingsState {
  data: MailingsData[];
  isLoading: LoadingState;
}

interface EditableGroupState {
  loading: LoadingState;
  keywords: KeywordsState;
  innerGroups: InnerGroupState;
  mailings: MailingsState;
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
  InnerGroupState,
  InnerGroupType,
  MailingsData,
  MailingsState,
};
