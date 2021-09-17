import { call, put, takeEvery, all, select } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { GeneratorSagaType } from 'store/types';
import { API } from 'utils/API';
import subscribesActions from './actions';
import subscribesSelectors from './selectors';
import { Subscribe, SubscribesData } from './types';

function* getSubscribesWorker(action: { payload: { group_id: string } }) {
  try {
    const { group_id } = action.payload;
    const response: AxiosResponse<SubscribesData> = yield call(() =>
      API.get(`/office/${group_id}/subscribes`)
    );

    if (response.status === 200) {
      yield put(
        subscribesActions.getSubscribesSuccess({
          data: response.data,
        })
      );
    } else if (response.status === 204) {
      const currentSubscribes: Subscribe[] = yield select(
        subscribesSelectors.subscribes
      );
      const currentCountSubscribes: number = yield select(
        subscribesSelectors.countSubscribes
      );
      yield put(
        subscribesActions.getSubscribesSuccess({
          data: {
            items: currentSubscribes,
            count: currentCountSubscribes,
          },
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(subscribesActions.getSubscribesFail());
  }
}

function* changeInnerGroupWorker(action: {
  payload: { inner_group_id: string; user_id: number; group_id: string };
}) {
  try {
    const { group_id, inner_group_id, user_id } = action.payload;
    const response: AxiosResponse = yield call(() =>
      API.post(`/office/${group_id}/change-inner-group`, {
        inner_group_id,
        user_id,
      })
    );
    if (response.status === 201 || response.status === 200) {
      // ЗАПИЛИТЬ УВЕДОМЛЯЛКИ
    }
  } catch {
    console.log('err changeInnerGroupWorker');
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([
    takeEvery(subscribesActions.getSubscribes, getSubscribesWorker),
    takeEvery(subscribesActions.changeInnerGroup, changeInnerGroupWorker),
  ]);
}

export default sagaWatcher;
