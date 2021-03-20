import axios, { AxiosResponse } from 'axios';
import { call, all, takeEvery, put } from 'redux-saga/effects';
import { GeneratorSagaType } from 'store/types';

import authActions from './actions';
import { authVkUrl } from './constants';

function* vkAuthWorker() {
  try {
    const response: AxiosResponse<any> = yield call(() =>
      axios.get(authVkUrl, {
        params: {
          client_id: process.env.VK_APP_ID,
          redirect_uri: 'https://education-bot-creator.web.app',
          display: 'page',
        },
      })
    );
    console.log(response);
    // if (response.status === 200) {
    //   yield put(authActions.vkAuthSuccess);
    // }
  } catch {
    // yield put(organizationActions.getTasksFail());
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([takeEvery(authActions.vkAuth, vkAuthWorker)]);
}

export default sagaWatcher;
