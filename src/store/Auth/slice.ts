import { createSlice } from '@reduxjs/toolkit';
import { initialState, nameReducer } from './constants';
import reducers from './reducer';

const authSlice = createSlice({
  initialState,
  name: nameReducer,
  reducers,
});

export default authSlice;
