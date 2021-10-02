import { ApplicationState, LoadingState } from 'store/types';
import { Subscribe } from './types';

const subscribes = (state: ApplicationState): Subscribe[] =>
  state.subscribes.subscribes.items;
const countSubscribes = (state: ApplicationState): number =>
  state.subscribes.subscribes.count;

const offset = (state: ApplicationState): number => state.subscribes.offset;

const loadingSubscribes = (state: ApplicationState): LoadingState =>
  state.subscribes.loading;

const subscribesSelectors = {
  subscribes,
  countSubscribes,
  loadingSubscribes,
  offset,
};

export default subscribesSelectors;
