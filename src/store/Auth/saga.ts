import { AxiosResponse } from 'axios';
import { call, all, takeEvery, put } from 'redux-saga/effects';
import { GeneratorSagaType } from 'store/types';
import { UserSettings } from 'store/Auth/types';
import { API } from 'utils/API';
import history from 'utils/history';

import authActions from './actions';

function* vkAuthWorker(action: { payload: { code: string } }) {
  const { code } = action.payload;
  try {
    const response: AxiosResponse<UserSettings> = yield call(() =>
      API.get('/auth', {
        params: {
          code,
        },
      })
    );
    if (response.status === 200) {
      // const token = localStorage.getItem(storageTokenName);
      // if (!token) {
      //   localStorage.setItem(storageTokenName, response.data.access_token);
      // } else {
      //   localStorage.removeItem(storageTokenName);
      //   localStorage.setItem(storageTokenName, response.data.access_token);
      // }
      // setTimeout(() => {
      //   localStorage.removeItem(storageTokenName);
      // }, response.data.expires_in * 1000);
      document.cookie = `user_id=${response.data.user_id}`;
      history.push('/office');
      yield put(authActions.vkAuthSuccess({ payload: response.data }));
    }
  } catch {
    // yield put(organizationActions.getTasksFail());
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([takeEvery(authActions.vkAuth, vkAuthWorker)]);
}

export default sagaWatcher;
