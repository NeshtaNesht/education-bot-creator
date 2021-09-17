import { createSlice } from '@reduxjs/toolkit';
import { initialState, nameReducer } from './constants';
import reducers from './reducer';

const subscribesSlice = createSlice({
  initialState,
  name: nameReducer,
  reducers,
});

export default subscribesSlice;
