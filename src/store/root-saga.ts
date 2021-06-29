import { all, fork } from 'redux-saga/effects';
import authSaga from './Auth/saga';
import { OfficeSaga } from './Office';
import { EditableGroupSaga } from './EditableGroup';
import { GeneratorSagaType } from './types';

function* rootSaga(): GeneratorSagaType<void> {
  yield all([fork(authSaga), fork(OfficeSaga), fork(EditableGroupSaga)]);
}

export default rootSaga;
