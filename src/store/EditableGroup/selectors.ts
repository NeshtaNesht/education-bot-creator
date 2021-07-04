import { ApplicationState, LoadingState } from 'store/types';
import { KeywordsData } from './types';

const keywords = (state: ApplicationState): KeywordsData[] =>
  state.editableGroup.keywords.data;

const officeSelectors = { keywords };

export default officeSelectors;
