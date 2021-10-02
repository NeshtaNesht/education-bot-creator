import { all, fork } from 'redux-saga/effects';
import authSaga from './Auth/saga';
import { OfficeSaga } from './Office';
import { EditableGroupSaga } from './EditableGroup';
import { GeneratorSagaType } from './types';
import { DialogSaga } from './Dialogs';
import { SubscribesSaga } from './Subscribes';

function* rootSaga(): GeneratorSagaType<void> {
  yield all([
    fork(authSaga),
    fork(OfficeSaga),
    fork(EditableGroupSaga),
    fork(DialogSaga),
    fork(SubscribesSaga),
  ]);
}

export default rootSaga;
