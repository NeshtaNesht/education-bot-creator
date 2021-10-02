import { ApplicationState, LoadingState } from 'store/types';
import { InnerGroupType, KeywordsData, MailingsData } from './types';

const keywords = (state: ApplicationState): KeywordsData[] =>
  state.editableGroup.keywords.data;

const isLodaingKeywords = (state: ApplicationState): LoadingState =>
  state.editableGroup.keywords.isLoading;

const innerGroups = (state: ApplicationState): InnerGroupType[] =>
  state.editableGroup.innerGroups.data;

const mailings = (state: ApplicationState): MailingsData[] =>
  state.editableGroup.mailings.data;

const mailingIsLoading = (state: ApplicationState): LoadingState =>
  state.editableGroup.mailings.isLoading;

const officeSelectors = {
  keywords,
  innerGroups,
  isLodaingKeywords,
  mailings,
  mailingIsLoading,
};

export default officeSelectors;
