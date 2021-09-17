import { ApplicationState } from 'store/types';
import { Subscribe } from './types';

const subscribes = (state: ApplicationState): Subscribe[] =>
  state.subscribes.subscribes.items;
const countSubscribes = (state: ApplicationState): number =>
  state.subscribes.subscribes.count;

const subscribesSelectors = { subscribes, countSubscribes };

export default subscribesSelectors;
