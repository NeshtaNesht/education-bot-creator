import { all, fork } from 'redux-saga/effects';
import authSaga from './Auth/saga';
import { GeneratorSagaType } from './types';

function* rootSaga(): GeneratorSagaType<void> {
  yield all([fork(authSaga)]);
}

export default rootSaga;
