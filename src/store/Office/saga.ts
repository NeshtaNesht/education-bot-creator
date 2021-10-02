import { AxiosResponse } from 'axios';
import { call, all, takeEvery, put } from 'redux-saga/effects';
import { GeneratorSagaType } from 'store/types';
import { API } from 'utils/API';
import history from 'utils/history';
import officeActions from './actions';
import { UserInfo, GroupsData } from './types';

/**
 * TODO: КНОПКА "СОздать бота"
 * TODO: Вывести список групп, в которых пользователь админ
 * TODO: Создать бота
 * TODO: Сделать так, чтобы бот писал в ответе "ПРИВЕТ" пользователю, который ему написал
 */
function* getUserInfoWorker() {
  try {
    const response: AxiosResponse<UserInfo> = yield call(() =>
      API.get('/user-info')
    );
    if (response.status === 200) {
      yield put(
        officeActions.getUserInfoSuccess({
          userInfo: response.data,
        })
      );
    }
  } catch {
    yield put(officeActions.getUserInfoFail());
  }
}

function* getUserGroupsWorker() {
  try {
    const response: AxiosResponse<GroupsData[]> = yield call(() =>
      API.get('/user-groups')
    );
    if (response.status === 200) {
      yield put(
        officeActions.getUserGroupsSuccess({
          data: response.data,
        })
      );
    }
  } catch {
    yield put(officeActions.getUserGroupsFail());
  }
}

function* vkAuthGroupWorker(action: {
  payload: {
    code?: string;
    group_id: string;
  };
}) {
  const { code, group_id } = action.payload;
  try {
    const response: AxiosResponse<{
      status: string;
      group_id: number;
    }> = yield call(() =>
      API.get('/auth-group', {
        params: { code, group_id },
      })
    );
    if (response.status === 200) {
      history.push(`/office/${response.data.group_id}`);
    }
  } catch (error) {
    console.log('vkAuthGroupWorker', error);
  }
}

function* sagaWatcher(): GeneratorSagaType<never> {
  yield all([
    takeEvery(officeActions.getUserInfo, getUserInfoWorker),
    takeEvery(officeActions.getUserGroups, getUserGroupsWorker),
    takeEvery(officeActions.vkAuthGroup, vkAuthGroupWorker),
  ]);
}

export default sagaWatcher;
