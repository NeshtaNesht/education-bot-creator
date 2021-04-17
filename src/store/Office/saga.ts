import { AxiosResponse } from 'axios';
import { call, all, takeEvery, put } from 'redux-saga/effects';
import { GeneratorSagaType } from 'store/types';
import { API, API_VK } from 'utils/API';
import officeActions from './actions';

/**
 * TODO: Реализовать функционал получения инфы о пользователе
 * TODO: Выводить инфу на странице Office, Привет, "ИМЯ"
 * TODO: КНОПКА "СОздать бота"
 * TODO: Вывести список групп, в которых пользователь админ
 * TODO: Создать бота
 * TODO: Сделать так, чтобы бот писал в ответе "ПРИВЕТ" пользователю, который ему написал
 */
function* getUserInfoWorker(payload: any) {
  try {
    // TODO: FIX IT
    const response: AxiosResponse<any> = yield call(() =>
      API.get('/api/auth', {
        params: {
          code,
        },
      })
    );
  } catch {
    // yield put(organizationActions.getTasksFail());
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([takeEvery(officeActions.getUserInfo, vkAuthWorker)]);
}

export default sagaWatcher;
