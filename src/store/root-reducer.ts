import { combineReducers } from 'redux';
import authSlice from './Auth/slice';

const clientsReducers = combineReducers<any>({
  auth: authSlice.reducer,
});

export default clientsReducers;
