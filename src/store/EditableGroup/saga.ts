import { AxiosResponse } from 'axios';
import { call, all, takeEvery, put } from 'redux-saga/effects';
import { GeneratorSagaType } from 'store/types';
import { API } from 'utils/API';
import history from 'utils/history';
import editableGroupActions from './actions';
import { initialState } from './constants';
import { FormStateType, InnerGroupType, KeywordsData } from './types';

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

function* getInnerGroupsWorker(action: {
  payload: {
    group_id: string;
  };
}) {
  const { group_id } = action.payload;
  try {
    const response: AxiosResponse<InnerGroupType[]> = yield call(() =>
      API.get(`/office/${group_id}/inner-groups`)
    );
    if (response.status === 200) {
      yield put(
        editableGroupActions.getInnerGroupsSuccess({
          data: response.data,
        })
      );
    }
  } catch {
    console.log('err getInnerGroupsWorker');
    yield put(editableGroupActions.getInnerGroupsFail());
  }
}

function* addInnerGroupsWorker(action: {
  payload: {
    group_id: string;
    name: string;
  };
}) {
  const { group_id, name } = action.payload;
  try {
    const response: AxiosResponse = yield call(() =>
      API.put(`/office/${group_id}/inner-groups`, {
        name,
      })
    );
    if (response.status === 200) {
      yield put(editableGroupActions.addInnerGroupsSuccess());
    }
  } catch {
    console.log('err addInnerGroupsWorker');
    yield put(editableGroupActions.addInnerGroupsFail());
  }
}

function* deleteInnerGroupsWorker(action: {
  payload: {
    group_id: string;
    id: string;
  };
}) {
  const { group_id, id } = action.payload;
  try {
    const response: AxiosResponse<InnerGroupType[]> = yield call(() =>
      API.delete(`/office/${group_id}/inner-groups`, {
        data: {
          id,
        },
      })
    );
    if (response.status === 200) {
      const res: AxiosResponse<InnerGroupType[]> = yield call(() =>
        API.get(`/office/${group_id}/inner-groups`)
      );
      yield put(editableGroupActions.getInnerGroupsSuccess({ data: res.data }));
    }
  } catch {
    console.log('err deleteInnerGroupsWorker');
    yield put(editableGroupActions.deleteInnerGroupFail());
  }
}

function* addNewMailingMessageWorker(action: {
  payload: { groups: string[]; message: string; group_id: string };
}) {
  try {
    const response: AxiosResponse = yield call(() =>
      API.post(`/office/${action.payload.group_id}/mailing`, {
        ...action.payload,
      })
    );
  } catch {
    console.log('err addNewMailingMessageWorker');
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([
    takeEvery(editableGroupActions.addNewKeyword, addNewKeywordWorker),
    takeEvery(editableGroupActions.getKeywords, getKeywordsWorker),
    takeEvery(editableGroupActions.deleteKeyword, deleteKeywordWorker),
    takeEvery(editableGroupActions.getInnerGroups, getInnerGroupsWorker),
    takeEvery(editableGroupActions.addInnerGroups, addInnerGroupsWorker),
    takeEvery(editableGroupActions.deleteInnerGroup, deleteInnerGroupsWorker),
    takeEvery(
      editableGroupActions.addNewMailingMessage,
      addNewMailingMessageWorker
    ),
  ]);
}

export default sagaWatcher;
