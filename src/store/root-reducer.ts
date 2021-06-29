import { combineReducers } from 'redux';
import { AuthSlice } from './Auth';
import { EditableGroupSlice } from './EditableGroup';
import { OfficeSlice } from './Office';
import { ApplicationState } from './types';

const clientsReducers = combineReducers<ApplicationState>({
  auth: AuthSlice.reducer,
  office: OfficeSlice.reducer,
  editableGroup: EditableGroupSlice.reducer,
});

export default clientsReducers;
