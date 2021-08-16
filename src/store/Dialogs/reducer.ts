/* eslint-disable no-param-reassign */
import { LoadingState } from 'store/types';
import { ReducerFunction, Dialog } from './types';

const getDialogs: ReducerFunction<{ group_id: string }> = (state) => {
  state.loading = LoadingState.LOADING;
};

const getDialogSuccess: ReducerFunction<{ dialogs: Dialog[] }> = (
  state,
  { payload }
) => {
  state.loading = LoadingState.RESOLVE;
  state.dialogs = payload.dialogs;
};

const getDialogFail: ReducerFunction = (state) => {
  state.loading = LoadingState.RESOLVE;
};

const addNewDialog: ReducerFunction<{ dialog: Dialog; group_id: string }> = (
  state
) => {
  state.loading = LoadingState.LOADING;
};

const addNewDialogSuccess: ReducerFunction = (state) => {
  state.loading = LoadingState.RESOLVE;
};

const addNewDialogFail: ReducerFunction = (state) => {
  state.loading = LoadingState.REJECT;
};

const deleteDialog: ReducerFunction<{
  id: string;
  group_id: string;
}> = () => {};
const deleteDialogSuccess: ReducerFunction = () => {};
const deleteDialogFail: ReducerFunction = () => {};

export default {
  getDialogs,
  getDialogSuccess,
  getDialogFail,
  addNewDialog,
  addNewDialogSuccess,
  addNewDialogFail,
  deleteDialog,
  deleteDialogSuccess,
  deleteDialogFail,
};
