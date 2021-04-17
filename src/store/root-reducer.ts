import { combineReducers } from 'redux';
import { AuthSlice } from './Auth';
import { OfficeSlice } from './Office';
import { ApplicationState } from './types';

const clientsReducers = combineReducers<ApplicationState>({
  auth: AuthSlice.reducer,
  office: OfficeSlice.reducer,
});

export default clientsReducers;
