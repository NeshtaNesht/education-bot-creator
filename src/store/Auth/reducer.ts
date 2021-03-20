import { LoadingState } from 'store/types';
import { ReducerFunction } from './types';

const vkAuth: ReducerFunction = (state) => {
  console.log('vkAuth');
};
const vkAuthSuccess: ReducerFunction<{ payload: any }> = (state, payload) => {
  console.log(payload);
};

const reducers = {
  vkAuth,
  vkAuthSuccess,
};

export default reducers;
