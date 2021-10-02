import { ApplicationState, LoadingState } from 'store/types';
import { Dialog } from './types';

const dialogs = (state: ApplicationState): Dialog[] => state.dialogs.dialogs;

const isLoadingDialog = (state: ApplicationState): LoadingState =>
  state.dialogs.loading;
const dialogsSelectors = { dialogs, isLoadingDialog };

export default dialogsSelectors;
