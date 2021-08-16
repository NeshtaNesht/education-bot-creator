import { call, put, takeEvery, all } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { GeneratorSagaType } from 'store/types';
import { API } from 'utils/API';
import history from 'utils/history';
import dialogActions from './actions';
import { initialState } from './constants';
import { Dialog } from './types';

function* getDialogWorker(action: { payload: { group_id: string } }) {
  try {
    const { group_id } = action.payload;
    const response: AxiosResponse<Dialog[]> = yield call(() =>
      API.get(`/office/${group_id}/dialog`)
    );

    if (response.status === 200) {
      yield put(
        dialogActions.getDialogSuccess({
          dialogs: response.data,
        })
      );
    } else if (response.status === 204) {
      yield put(
        dialogActions.getDialogSuccess({
          dialogs: initialState.dialogs,
        })
      );
    }
  } catch {
    yield put(dialogActions.getDialogFail());
  }
}

function* addNewDialogWorker(action: {
  payload: { dialog: Dialog; group_id: string };
}) {
  try {
    const { dialog, group_id } = action.payload;
    const response: AxiosResponse = yield call(() =>
      API.put(`/office/${group_id}/dialog`, {
        ...dialog,
      })
    );
    if (response.status === 201) {
      history.push(`/office/${group_id}`);
      yield put(dialogActions.addNewDialogSuccess());
    }
  } catch {
    yield put(dialogActions.addNewDialogFail());
  }
}

function* deleteDialogWorker(action: {
  payload: { id: string; group_id: string };
}) {
  try {
    const { id, group_id } = action.payload;
    const response: AxiosResponse = yield call(() =>
      API.delete(`/office/${group_id}/dialog`, {
        data: { id },
      })
    );
    if (response.status === 200) {
      yield put(dialogActions.deleteDialogSuccess());
    }
  } catch {
    yield put(dialogActions.getDialogFail());
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([
    takeEvery(dialogActions.getDialogs, getDialogWorker),
    takeEvery(dialogActions.addNewDialog, addNewDialogWorker),
    takeEvery(dialogActions.deleteDialog, deleteDialogWorker),
  ]);
}

export default sagaWatcher;
