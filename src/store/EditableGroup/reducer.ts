/* eslint-disable no-param-reassign */
import { LoadingState } from 'store/types';
import { FormStateType, ReducerFunction, KeywordsData } from './types';

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

const reducers = {
  addNewKeyword,
  getKeywords,
  getKeywordsSuccess,
  getKeywordsfail,
  deleteKeyword,
  deleteKeywordSuccess,
  deleteKeywordFail,
};

export default reducers;
