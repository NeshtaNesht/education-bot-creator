import { AxiosResponse } from 'axios';
import { call, all, takeEvery, put } from 'redux-saga/effects';
import { GeneratorSagaType } from 'store/types';
import { API } from 'utils/API';
import history from 'utils/history';
import editableGroupActions from './actions';
import { initialState } from './constants';
import { FormStateType, KeywordsData } from './types';

function* addNewKeywordWorker(action: {
  payload: {
    group_id: string;
    data: FormStateType;
  };
}) {
  const { group_id, data } = action.payload;
  try {
    const response: AxiosResponse = yield call(() =>
      API.put(`/office/${group_id}/keyword`, {
        data,
      })
    );
    if (response.status === 201) {
      history.push(`/office/${group_id}`);
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* getKeywordsWorker(action: {
  payload: {
    group_id: string;
  };
}) {
  const { group_id } = action.payload;
  try {
    const response: AxiosResponse<KeywordsData[]> = yield call(() =>
      API.get(`/office/${group_id}/keyword`)
    );
    if (response.status === 200) {
      yield put(
        editableGroupActions.getKeywordsSuccess({
          data: response.data,
        })
      );
    } else if (response.status === 204) {
      yield put(
        editableGroupActions.getKeywordsSuccess({
          data: initialState.keywords.data,
        })
      );
    }
  } catch {
    console.log('error getKeywordsWorker');
  }
}

function* deleteKeywordWorker(action: {
  payload: {
    id: string;
    group_id: string;
  };
}) {
  const { id, group_id } = action.payload;
  try {
    const response: AxiosResponse = yield call(() =>
      API.delete(`/office/${group_id}/keyword`, {
        data: {
          id,
        },
      })
    );
    if (response.status === 200) {
      yield put(editableGroupActions.deleteKeywordSuccess());
    }
  } catch (err) {
    console.log(err, 'deleteKeywordWorker');
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([
    takeEvery(editableGroupActions.addNewKeyword, addNewKeywordWorker),
    takeEvery(editableGroupActions.getKeywords, getKeywordsWorker),
    takeEvery(editableGroupActions.deleteKeyword, deleteKeywordWorker),
  ]);
}

export default sagaWatcher;
