import { AxiosResponse } from 'axios';
import { call, all, takeEvery, put } from 'redux-saga/effects';
import { GeneratorSagaType } from 'store/types';
import { API } from 'utils/API';
import editableGroupActions from './actions';
import { FormStateType } from './types';

function* addNewKeywordWorker(action: {
  payload: {
    group_id: string;
    data: FormStateType;
  };
}) {
  const { group_id, data } = action.payload;
  try {
    const response: AxiosResponse = yield call(() =>
      API.post(`/office/${group_id}/new-keyword`, {
        data,
      })
    );
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([
    takeEvery(editableGroupActions.addNewKeyword, addNewKeywordWorker),
  ]);
}

export default sagaWatcher;
