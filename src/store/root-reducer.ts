import { combineReducers } from 'redux';
import { AuthSlice } from './Auth';
import { EditableGroupSlice } from './EditableGroup';
import { OfficeSlice } from './Office';
import { DialogSlice } from './Dialogs';
import { SubscribesSlice } from './Subscribes';
import { ApplicationState } from './types';

const clientsReducers = combineReducers<ApplicationState>({
  auth: AuthSlice.reducer,
  office: OfficeSlice.reducer,
  editableGroup: EditableGroupSlice.reducer,
  dialogs: DialogSlice.reducer,
  subscribes: SubscribesSlice.reducer,
});

export default clientsReducers;
