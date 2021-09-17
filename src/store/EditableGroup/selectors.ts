import { ApplicationState } from 'store/types';
import { InnerGroupType, KeywordsData } from './types';

const keywords = (state: ApplicationState): KeywordsData[] =>
  state.editableGroup.keywords.data;

const innerGroups = (state: ApplicationState): InnerGroupType[] =>
  state.editableGroup.innerGroups.data;

const officeSelectors = { keywords, innerGroups };

export default officeSelectors;
