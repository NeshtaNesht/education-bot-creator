import { ApplicationState } from 'store/types';
import { Dialog } from './types';

const dialogs = (state: ApplicationState): Dialog[] => state.dialogs.dialogs;

const dialogsSelectors = { dialogs };

export default dialogsSelectors;
