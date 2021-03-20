import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './root-reducer';
import rootSaga from './root-saga';

const preloadedState = {};
const devTools = true;

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
    immutableCheck: false,
  }),
  sagaMiddleware,
];
const store = configureStore({
  reducer: rootReducers,
  middleware,
  preloadedState,
  devTools,
});

sagaMiddleware.run(rootSaga);

export default store;
