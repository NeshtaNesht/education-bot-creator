/* eslint-disable no-param-reassign */
import { LoadingState } from 'store/types';
import {
  FormStateType,
  ReducerFunction,
  KeywordsData,
  InnerGroupType,
  MailingsData,
} from './types';

const addNewKeyword: ReducerFunction<{
  group_id: string;
  data: FormStateType;
}> = (state) => {
  state.loading = LoadingState.LOADING;
};

const getKeywords: ReducerFunction<{ group_id: string }> = (state) => {
  state.keywords.isLoading = LoadingState.LOADING;
};

const getKeywordsSuccess: ReducerFunction<{ data: KeywordsData[] }> = (
  state,
  { payload }
) => {
  state.keywords.isLoading = LoadingState.RESOLVE;
  state.keywords.data = payload.data;
};

const getKeywordsfail: ReducerFunction = (state) => {
  state.keywords.isLoading = LoadingState.REJECT;
};

const deleteKeyword: ReducerFunction<{ id: string; group_id: string }> = (
  state
) => {
  state.keywords.isLoading = LoadingState.LOADING;
};

const deleteKeywordSuccess: ReducerFunction = (state) => {
  state.keywords.isLoading = LoadingState.RESOLVE;
};

const deleteKeywordFail: ReducerFunction = (state) => {
  state.keywords.isLoading = LoadingState.REJECT;
};

const getInnerGroups: ReducerFunction<{ group_id: string }> = (state) => {
  state.innerGroups.isLoading = LoadingState.LOADING;
};

const getInnerGroupsSuccess: ReducerFunction<{ data: InnerGroupType[] }> = (
  state,
  { payload }
) => {
  state.innerGroups.isLoading = LoadingState.RESOLVE;
  state.innerGroups.data = payload.data;
};

const getInnerGroupsFail: ReducerFunction = (state) => {
  state.innerGroups.isLoading = LoadingState.REJECT;
};

const addInnerGroups: ReducerFunction<{ group_id: string; name: string }> = (
  state
) => {
  state.innerGroups.isLoading = LoadingState.LOADING;
};

const addInnerGroupsSuccess: ReducerFunction = (state) => {
  state.innerGroups.isLoading = LoadingState.RESOLVE;
};

const addInnerGroupsFail: ReducerFunction = (state) => {
  state.innerGroups.isLoading = LoadingState.REJECT;
};

const deleteInnerGroup: ReducerFunction<{ group_id: string; id: string }> = (
  state
) => {
  state.innerGroups.isLoading = LoadingState.LOADING;
};

const deleteInnerGroupSuccess: ReducerFunction = (state) => {
  state.innerGroups.isLoading = LoadingState.RESOLVE;
};

const deleteInnerGroupFail: ReducerFunction = (state) => {
  state.innerGroups.isLoading = LoadingState.REJECT;
};

const addNewMailingMessage: ReducerFunction<{
  groups: string[];
  message: string;
  group_id: string;
}> = () => {};

const getMailings: ReducerFunction<{ group_id: string }> = (state) => {
  state.mailings.isLoading = LoadingState.LOADING;
};

const getMailingsSuccess: ReducerFunction<{ data: MailingsData[] }> = (
  state,
  { payload }
) => {
  state.mailings.isLoading = LoadingState.RESOLVE;
  state.mailings.data = payload.data;
};

const getMailingsFail: ReducerFunction = (state) => {
  state.mailings.isLoading = LoadingState.REJECT;
};

const reducers = {
  addNewKeyword,
  getKeywords,
  getKeywordsSuccess,
  getKeywordsfail,
  deleteKeyword,
  deleteKeywordSuccess,
  deleteKeywordFail,
  getInnerGroups,
  getInnerGroupsSuccess,
  getInnerGroupsFail,
  addInnerGroups,
  addInnerGroupsSuccess,
  addInnerGroupsFail,
  deleteInnerGroup,
  deleteInnerGroupSuccess,
  deleteInnerGroupFail,
  addNewMailingMessage,
  getMailings,
  getMailingsSuccess,
  getMailingsFail,
};

export default reducers;
