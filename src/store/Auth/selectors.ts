import { ApplicationState } from 'store/types';
import { AuthState } from './types';

const token = (state: ApplicationState): string => state.auth.user.access_token;

export default {
  token,
};
